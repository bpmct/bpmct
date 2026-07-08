---
title: "Fixing \"Input Not Supported\" on an AOC E2070S on macOS"
date: "2026-07-08"
category: "Tinkering Notes"
description: "A not-ideal-but-good-enough workaround for the \"Input Not Supported\" error on an AOC E2070S monitor connected to a Mac, using BetterDisplay's DDC features."
---

# Fixing "Input Not Supported" on an AOC E2070S on macOS

I used an [AOC E2070S](https://www.displayspecifications.com/en/model/a217fef) (a 20-inch, 1600x900 monitor) as a second screen for a couple of weeks. Plugged into a Mac, it kept showing "Input Not Supported" on the OSD. Sometimes the screen was black, sometimes it flashed the error and gave up.

This isn't a great fix, but it got me through two weeks, so I'm writing it down in case it helps someone.

## The workaround

I used [BetterDisplay](https://github.com/waydabber/BetterDisplay), which can talk to the monitor over DDC.

1. Install BetterDisplay and open it.
2. Find the E2070S in the display list.
3. Run **"Detect DDC capabilities"**.
4. Then run **"Auto-configure DDC features"**.
5. Set the resolution to **1600x900** and leave it there.

After that the monitor accepted the signal. Once it's at 1600x900 it mostly stays working.

## When it comes back

The error would sometimes return, usually after sleep or unplugging. What fixed it for me was adjusting the brightness in BetterDisplay by a notch. That was enough to get the picture back.

I don't know exactly why that works, but it was reliable enough that I stopped worrying about it.

## Is this a good fix?

Not really. It's a workaround for an old, cheap monitor. If this were a permanent setup I'd just use a different monitor. But for a temporary second screen it was fine.

Hope it helps someone.
