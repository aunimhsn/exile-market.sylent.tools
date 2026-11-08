#!/usr/bin/env python3
"""Drives Exile Market in a virtual KWin session: one command per line on a FIFO, one answer per line
in a log. Everything stays in this session: its display, its clipboard, its own settings folders."""
import os, shlex, subprocess, sys, threading, time
from Xlib import X, Xatom, display as xdisplay
from Xlib.protocol import event as xevent

W = os.path.dirname(os.path.abspath(__file__))
OUT = os.environ.get("CAPTURE_OUT", f"{W}/out")
APP = f"{W}/target/release/rust-exile-market"
os.makedirs(OUT, exist_ok=True)
DISPLAY = os.environ["DISPLAY"]

def log(*parts):
    with open(f"{W}/capture.log", "a") as f:
        f.write(" ".join(str(p) for p in parts) + "\n")

class Clipboard(threading.Thread):
    daemon = True
    def __init__(self):
        super().__init__()
        self.d = xdisplay.Display()
        self.win = self.d.screen().root.create_window(0, 0, 1, 1, 0, X.CopyFromParent)
        self.CLIP = self.d.intern_atom("CLIPBOARD")
        self.UTF8 = self.d.intern_atom("UTF8_STRING")
        self.TARGETS = self.d.intern_atom("TARGETS")
        self.TEXT = self.d.intern_atom("TEXT")
        self.data = b""
        self.lock = threading.Lock()
    def set(self, text):
        with self.lock:
            self.data = text.encode()
            self.win.set_selection_owner(self.CLIP, X.CurrentTime)
            self.d.sync()
    def run(self):
        while True:
            with self.lock:
                e = self.d.next_event() if self.d.pending_events() else None
                if e is not None:
                    self.answer(e)
            if e is None:
                time.sleep(.01)
    def answer(self, e):
        if e.type == X.SelectionRequest:
            prop = e.property or e.target
            if e.target == self.TARGETS:
                e.requestor.change_property(prop, Xatom.ATOM, 32, [self.TARGETS, self.UTF8, self.TEXT, Xatom.STRING])
            elif e.target in (self.UTF8, self.TEXT, Xatom.STRING):
                e.requestor.change_property(prop, e.target, 8, self.data)
            else:
                prop = 0
            e.requestor.send_event(xevent.SelectionNotify(time=e.time, requestor=e.requestor, selection=e.selection, target=e.target, property=prop))
            self.d.flush()

clip = Clipboard(); clip.start()
app = None
recs = {}

def sh(cmd):
    return subprocess.run(cmd, shell=True, capture_output=True, text=True)

def window():
    out = sh("xdotool search --onlyvisible --name '^Exile Market$'").stdout.split()
    return out[-1] if out else None

def run(parts):
    global app
    c = parts[0]
    if c == "start":
        lang = parts[1]; scale = parts[2] if len(parts) > 2 else "2"
        home = f"{W}/home-{lang}"
        env = dict(os.environ, LANG="fr_FR.UTF-8" if lang == "fr" else "en_US.UTF-8", LC_ALL="fr_FR.UTF-8" if lang == "fr" else "en_US.UTF-8", LANGUAGE=lang,
                   XDG_CONFIG_HOME=f"{home}/config", XDG_CACHE_HOME=f"{home}/cache", XDG_DATA_HOME=f"{home}/data", XDG_STATE_HOME=f"{home}/state",
                   WINIT_X11_SCALE_FACTOR=scale, WINIT_UNIX_BACKEND="x11")
        env.pop("WAYLAND_DISPLAY", None)
        app = subprocess.Popen([APP], env=env, stdout=open(f"{W}/app.log", "a"), stderr=subprocess.STDOUT)
        return f"started {app.pid}"
    if c == "stop":
        if app: app.terminate(); app.wait(10); app = None
        return "stopped"
    if c == "item":
        clip.set(open(parts[1]).read())
        win = window()
        # A small motion of the pointer: the window redraws at once, as it does for a player.
        for x in (380, 400, 420):
            time.sleep(.35)
            sh(f"xdotool mousemove --window {win} {x} 1300")
        return "clipboard set"
    win = window()
    if c == "win":
        return win, sh(f"xdotool getwindowgeometry {win}").stdout.replace("\n", " ") if win else "none"
    if c == "tree":
        return sh("xwininfo -root -tree | head -40").stdout
    if c == "shot":
        path = f"{OUT}/{parts[1]}.png"
        r = sh(f"ffmpeg -y -loglevel error -f x11grab -draw_mouse 0 -window_id {win} -i {DISPLAY} -frames:v 1 -update 1 '{path}'")
        return path, r.stderr[-300:]
    if c == "rec":
        name = parts[1]; fps = parts[2] if len(parts) > 2 else "60"
        path = f"{OUT}/{name}.mkv"
        recs[name] = subprocess.Popen(shlex.split(f"ffmpeg -y -loglevel error -f x11grab -draw_mouse 0 -framerate {fps} -window_id {win} -i {DISPLAY} -c:v libx264 -preset ultrafast -crf 8 -pix_fmt yuv444p '{path}'"), stdin=subprocess.PIPE)
        return "recording", path
    if c == "endrec":
        p = recs.pop(parts[1]); p.communicate(b"q", timeout=20); return "recorded", parts[1]
    if c == "resize":
        return sh(f"xdotool windowsize {win} {parts[1]} {parts[2]}").stderr
    if c == "move":
        return sh(f"xdotool mousemove --window {win} {parts[1]} {parts[2]}").stderr
    if c == "click":
        return sh(f"xdotool mousemove --window {win} {parts[1]} {parts[2]}; sleep .35; xdotool mousedown 1; sleep .07; xdotool mouseup 1; sleep .1; xdotool mousemove_relative 1 0").stderr
    if c == "wheel":
        button = 5 if parts[1] == "down" else 4
        for _ in range(int(parts[2])):
            sh(f"xdotool click {button}"); time.sleep(float(parts[3]) if len(parts) > 3 else .03)
        return "wheeled"
    if c == "key":
        return sh(f"xdotool key {parts[1]}").stderr
    if c == "wait":
        time.sleep(float(parts[1])); return "waited"
    if c == "exit":
        if app: app.terminate()
        sys.exit(0)
    return "unknown"

fifo = f"{W}/cmd.fifo"
if not os.path.exists(fifo):
    os.mkfifo(fifo)
log("READY", DISPLAY)
while True:
    with open(fifo) as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                log(">", line, "=>", run(shlex.split(line)))
            except SystemExit:
                raise
            except Exception as e:
                log(">", line, "ERROR", repr(e))
