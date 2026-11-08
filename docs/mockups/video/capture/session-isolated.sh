#!/bin/bash
# Like session.sh, with its own runtime folder: a portal started on the private bus can't take over the
# document portal of the owner's desktop, which lives in the real XDG_RUNTIME_DIR.
W=$(dirname "$(readlink -f "$0")")
unset WAYLAND_DISPLAY DISPLAY
export KDE_FULL_SESSION=
export XDG_RUNTIME_DIR=$W/runtime
mkdir -p -m 700 "$XDG_RUNTIME_DIR"
exec dbus-run-session -- kwin_wayland --virtual --xwayland --no-lockscreen --no-global-shortcuts --width 2000 --height 1700 --socket wl-em-capture --exit-with-session "python3 $W/capture.py"
