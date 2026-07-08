---
title: "Fixing \"Input Not Supported\" on an AOC E2070S on macOS"
date: "2026-07-08"
category: "Tinkering Notes"
description: "A not-ideal-but-good-enough workaround for the \"Input Not Supported\" error on an AOC E2070S monitor when connected to a Mac, using BetterDisplay's DDC features."
---

# Fixing "Input Not Supported" on an AOC E2070S on macOS

I was working out of a secondary setup for a couple of weeks and the only spare monitor I had was an [AOC E2070S](https://www.aoc.com/en/monitors/e2070swn) — a 20-inch, 1600x900 panel that's older than some of my cables. Plugged into a Mac, it kept throwing the dreaded **"Input Not Supported"** message on the OSD. Sometimes it'd come up black, sometimes it'd flash the error and give up.

This isn't a clean fix, but it got me through two weeks of using it as a second screen, so I'm writing it down in case it saves someone else the same headache.

## What's going on

The E2070S is a 1600x900 display and it's pretty picky about the timing/resolution it's handed. When the Mac sends it a mode it doesn't like — which happens more than you'd expect over adapters — it just refuses the signal and shows "Input Not Supported" instead of falling back to something sane.

## The workaround

I used [BetterDisplay](https://github.com/waydabber/BetterDisplay), which can talk to the monitor over DDC and coax it into behaving.

1. Install BetterDisplay and open it.
2. Find the E2070S in the display list.
3. Run **"Detect DDC capabilities"**.
4. Then run **"Auto-configure DDC features"**.
5. Set the resolution to **1600x900** and leave it there.

That combination got the monitor to accept the signal and stop complaining. Once it's happy at its native 1600x900, it mostly stays happy.

## When it comes back

Every so often the error would return — usually after sleep or unplugging. The fix that consistently worked for me was almost dumb: **just nudge the brightness**. Bumping it up or down a notch in BetterDisplay pokes the display enough to re-sync and the picture comes back.

Not sure exactly why that does it — my guess is it forces a DDC round-trip that re-negotiates the mode — but it worked reliably enough that I stopped worrying about it.

## Is this a good fix?

No, not really. It's a workaround for an old, cheap monitor being fussy about signal timing on hardware it was never really meant to sit next to. If this were a permanent setup I'd probably just grab a monitor that handshakes cleanly.

But for a temporary secondary display I was living out of for two weeks? It was completely fine. Detect DDC capabilities, auto-configure, pin it to 1600x900, and adjust the brightness when it sulks.

Hope it helps someone.
