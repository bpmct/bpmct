---
title: "M5StickC PLUS2 IR Transmitter with Home Assistant"
date: "2026-02-22"
description: "Getting the IR transmitter working on the M5StickC PLUS2 with ESPHome and Home Assistant. The pinout is different from the original M5StickC."
---

# M5StickC PLUS2 IR Transmitter with Home Assistant

**TL;DR**: The M5StickC PLUS2 IR transmitter is on **GPIO19**, not GPIO9 like the original M5StickC. Most existing guides get this wrong.

There are a bunch of posts about using the original M5StickC with ESPHome and Home Assistant — [this HA community thread](https://community.home-assistant.io/t/working-esphome-yaml-for-m5stickc/538050), [this older one](https://community.home-assistant.io/t/do-you-have-an-m5stick-c-working-with-current-esphome/210895), and [airy10's GitHub repo](https://github.com/airy10/esphome-m5stickC) are the most referenced. But they're all for the original M5StickC, and the **PLUS2 has a different pinout**. The IR transmitter is on **GPIO19** instead of GPIO9. I couldn't find a PLUS2-specific ESPHome IR guide anywhere, so here's what worked.

The [official M5Stack PLUS2 docs](https://docs.m5stack.com/en/core/M5StickC%20PLUS2) confirm the pin difference.

## The goal

I wanted to control [this IR candle from Amazon](https://www.amazon.com/dp/B0D5CYMZVD) through Home Assistant. It's a cheap flickering candle with an IR remote — on/off, that's it.

![M5StickC PLUS2 and IR candle](/images/m5stickcplus2-candle.jpg)

## Reading the IR codes

I used a **Flipper Zero** to read the NEC codes from the candle's remote:

- **ON**: address `0xFF00`, command `0xFE01`
- **OFF**: address `0xFF00`, command `0xFF00`

## ESPHome config

The key thing: use `GPIO19` for the IR transmitter pin. Most M5StickC guides say GPIO9 — that's the old model. Here's the full config — swap out the NEC addresses/commands for whatever your device uses:

```yaml
esp32:
  board: m5stick-c
  framework:
    type: esp-idf

# M5StickC PLUS2 IR transmitter — GPIO19, not GPIO9!
remote_transmitter:
  pin:
    number: GPIO19
  carrier_duty_percent: 50%
  id: internal_ir

# Expose as a light entity in Home Assistant
light:
  - platform: binary
    name: "IR Light"
    id: ir_light
    output: ir_light_output

output:
  - platform: template
    id: ir_light_output
    type: binary
    write_action:
      - if:
          condition:
            lambda: 'return state;'
          then:
            - remote_transmitter.transmit_nec:
                transmitter_id: internal_ir
                address: 0xFF00      # your device address
                command: 0xFE01      # your ON command
                command_repeats: 1
          else:
            - remote_transmitter.transmit_nec:
                transmitter_id: internal_ir
                address: 0xFF00      # your device address
                command: 0xFF00      # your OFF command
                command_repeats: 1
```

I used `light` + `binary` instead of a `switch` so Home Assistant treats it as a light entity with a proper toggle.

## Other PLUS2 pins

For reference, here are the other PLUS2-specific pins I found useful:

| Function | Pin |
|----------|-----|
| IR Transmitter | GPIO19 |
| SPI CLK | GPIO13 |
| SPI MOSI | GPIO15 |
| I2C Internal SDA/SCL | GPIO21 / GPIO22 |
| I2C External SDA/SCL | GPIO0 / GPIO26 |
| Button A | GPIO37 |
| Button B | GPIO39 |

That's it. Tiny device, works great as a dedicated IR blaster sitting on a shelf.
