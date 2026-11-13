#!/bin/bash
# The three screens of the page in English and in French: the empty window, the price of a unique and the
# filters of a rare. It needs the release binary in target/release/; the screens land in out-screens/, to
# copy to src/assets/screens/<lang>/ as copy.png, price.png and filters.png. Check them by eye: a click
# that misses after a change of the interface makes a wrong image, not an error.
W=$(dirname "$(readlink -f "$0")")
. "$W/common.sh"
open_session out-screens
for L in en fr; do
  # A text that isn't an item: the application would otherwise start on the item left in the clipboard.
  c "item $W/items-screens/none.txt"; p 3
  c "start $L 2"; p 45
  settle; c "shot copy-$L"; p 1.5
  c "item $W/items-screens/$L-ring.txt"; p 4
  settle; c "shot price-$L"; p 1.5
  c "item $W/items-screens/$L-bow.txt"; p 4
  # The button « Show N stats » under the tags of the bow, at the left of the window (2026-11-13).
  c "click 100 398"; p 1
  settle; c "shot filters-$L"; p 1.5
  c "stop"; p 2
done
check_run 6
