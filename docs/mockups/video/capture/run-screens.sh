#!/bin/bash
# The three screens of the page in English and in French: the empty window, the price of a unique and the
# filters of a rare. Like run-deck.sh, it needs the release binary in target/release/; the screens land in
# out-screens/, to copy to src/assets/screens/<lang>/ as copy.png, price.png and filters.png.
W=$(dirname "$(readlink -f "$0")")
c(){ echo "$1" > $W/cmd.fifo; }; p(){ python3 -c "import time;time.sleep($1)"; }
# A shot shows the window as it was one or two paints before: three moves of the pointer over the status
# line, where no tooltip opens, paint it again before each shot.
settle(){ for x in 650 700 660; do c "move $x 1415"; p .7; done; }
rm -f $W/capture.log $W/cmd.fifo; mkdir -p $W/out-screens
flatpak-spawn --host bash -c "cd $W; CAPTURE_OUT=$W/out-screens nohup ./session-isolated.sh > $W/session-screens.log 2>&1 &"
for i in $(seq 1 25); do p 1; [ -p $W/cmd.fifo ] && grep -q READY $W/capture.log 2>/dev/null && break; done
grep READY $W/capture.log || { echo NO-SESSION; exit 1; }
for L in en fr; do
  # A text that isn't an item: the application would otherwise start on the item left in the clipboard.
  c "item $W/items-screens/none.txt"; p 3
  c "start $L 2"; p 45
  settle; c "shot copy-$L"; p 1.5
  c "item $W/items-screens/$L-ring.txt"; p 4
  settle; c "shot price-$L"; p 1.5
  c "item $W/items-screens/$L-bow.txt"; p 4
  c "click 100 398"; p 1
  settle; c "shot filters-$L"; p 1.5
  c "stop"; p 2
done
c "exit"; p 2; echo SCREENS-DONE
