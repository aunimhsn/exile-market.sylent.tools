#!/bin/bash
# The card of the video: Headhunter and its price, in English and in French. It needs the release binary
# in target/release/; out-deck/s-headhunter-<lang>.png goes to outputs/2026-11-06-video/assets/<lang>/
# as s-headhunter.png before the render (docs/technical-choices.md, Video of the first screen).
W=$(dirname "$(readlink -f "$0")")
. "$W/common.sh"
open_session out-deck
for L in en fr; do
  # A text that isn't an item: the application would otherwise start on the item left in the clipboard.
  c "item $W/items-screens/none.txt"; p 3
  c "start $L 2"; p 45
  c "item $W/items-deck/$L.txt"; p 6
  settle; c "shot s-headhunter-$L"; p 1.5
  c "stop"; p 2
done
check_run 2
