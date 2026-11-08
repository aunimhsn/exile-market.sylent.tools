#!/bin/bash
W=$(dirname "$(readlink -f "$0")")
c(){ echo "$1" > $W/cmd.fifo; }; p(){ python3 -c "import time;time.sleep($1)"; }
rm -f $W/capture.log $W/cmd.fifo; mkdir -p $W/out-deck
flatpak-spawn --host bash -c "cd $W; CAPTURE_OUT=$W/out-deck nohup ./session-isolated.sh > $W/session-deck.log 2>&1 &"
for i in $(seq 1 25); do p 1; [ -p $W/cmd.fifo ] && grep -q READY $W/capture.log 2>/dev/null && break; done
grep READY $W/capture.log || { echo NO-SESSION; exit 1; }
for L in en fr; do
  c "start $L 2"; p 45
  c "item $W/items-deck/$L.txt"; p 6
  c "shot s-headhunter-$L"; p 1.5
  c "stop"; p 2
done
c "exit"; p 2; echo DECK-DONE
