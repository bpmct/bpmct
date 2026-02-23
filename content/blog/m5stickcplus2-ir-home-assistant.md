---
title: "M5StickC PLUS2 IR Transmitter with Home Assistant"
date: "2026-02-22"
category: "Tinkering Notes"
description: "Getting the IR transmitter working on the M5StickC PLUS2 with ESPHome and Home Assistant. The pinout is different from the original M5StickC."
---

# [M5StickC PLUS2](https://shop.m5stack.com/products/m5stickc-plus2-esp32-mini-iot-development-kit) IR Transmitter with Home Assistant

Most example ESPHome configs for the M5StickC ([this thread](https://community.home-assistant.io/t/working-esphome-yaml-for-m5stickc/538050), [this one](https://community.home-assistant.io/t/do-you-have-an-m5stick-c-working-with-current-esphome/210895), [airy10's repo](https://github.com/airy10/esphome-m5stickC)) use GPIO9 for the IR transmitter. The PLUS2 moved it to **GPIO19** ([official docs](https://docs.m5stack.com/en/core/M5StickC%20PLUS2)).

I used mine to control [this IR candle](https://www.amazon.com/dp/B0D5CYMZVD) through Home Assistant.

![M5StickC PLUS2 and IR candle](/images/m5stickcplus2-candle.jpg)

I used a Flipper Zero to sniff the NEC codes off the candle's remote:

- **ON**: address `0xFF00`, command `0xFE01`
- **OFF**: address `0xFF00`, command `0xFF00`

## Flashing

Generate the `.bin` from the ESPHome add-on in Home Assistant, then flash it via [ESPHome Web](https://web.esphome.io/) over USB. If you try to flash directly from ESPHome Web without the HA-generated binary, the WiFi config won't work.

## ESPHome config

The important bit is `GPIO19` for the IR pin. Swap out the NEC addresses/commands for your device:

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

## PLUS2 pinout reference

| Function | Pin |
|----------|-----|
| IR Transmitter | GPIO19 |
| SPI CLK | GPIO13 |
| SPI MOSI | GPIO15 |
| I2C Internal SDA/SCL | GPIO21 / GPIO22 |
| I2C External SDA/SCL | GPIO0 / GPIO26 |
| Button A | GPIO37 |
| Button B | GPIO39 |

See the [M5Stack docs](https://docs.m5stack.com/en/core/M5StickC%20PLUS2) for the full pinout.
