# What run-deck.sh and run-screens.sh share: the session, its commands, and the checks that a run really
# made its images. Sourced with W set to the folder of the scripts.

# One command to the session. The timeout keeps a script from waiting forever on a session that ended.
c(){ timeout 5 bash -c 'echo "$1" > "$2"' _ "$1" "$W/cmd.fifo"; }
p(){ python3 -c "import time; time.sleep($1)"; }

# A shot shows the window as it was one or two paints before: three moves of the pointer paint it again.
# They stay on the status line (y = 1415 in a window 1440 px high at scale 2), where no tooltip opens.
settle(){ for x in 650 700 660; do c "move $x 1415"; p .7; done; }

# Starts the virtual session, its images written to $W/$1, emptied first so that no former image stays.
open_session(){
  OUT=$W/$1
  [ -x "$W/target/release/exile-market" ] || { echo "NO-BINARY: copy the release build of the application to $W/target/release/exile-market"; exit 1; }
  rm -rf "$OUT"; mkdir -p "$OUT"; rm -f "$W/capture.log" "$W/cmd.fifo"
  flatpak-spawn --host bash -c "cd '$W'; CAPTURE_OUT='$OUT' nohup ./session-isolated.sh > '$W/session-$1.log' 2>&1 &"
  for i in $(seq 1 25); do p 1; [ -p "$W/cmd.fifo" ] && grep -q READY "$W/capture.log" 2>/dev/null && break; done
  grep -q READY "$W/capture.log" 2>/dev/null || { echo NO-SESSION; exit 1; }
  trap 'c exit; p 2' EXIT
}

# Fails unless no command answered with an error and the run made the number of images given.
check_run(){
  p 2
  if grep ERROR "$W/capture.log"; then exit 1; fi
  n=$(find "$OUT" -name '*.png' | wc -l)
  [ "$n" -eq "$1" ] || { echo "ONLY $n OF $1 IMAGES in $OUT"; exit 1; }
  echo "DONE: $n images in $OUT"
}
