---
title: "PopOS on a 2017 13-inch MacBook Pro"
date: "2025-01-01"
description: "Running Pop!_OS on a 2017 MacBook Pro was more difficult than I had expected."
---

# PopOS on a 2017 MacBook Pro

Running Pop!_OS on a 2017 MacBook Pro was more difficult than I had expected, so I figured I'd document my my findings in hope that it would be useful to others.

## Methodology

My methodology was to install Pop!_OS on an external SATA disk over USB3 to preserve the original hard drive. This way, I can still boot from macOS if needed. I ultimately hope to boot from a Thunderbolt hub versus having 2 cables plugged in.

## Fixing the Installer Crash

The installer would immediately crash when picking an install method (at the screen that shows "Clean Install" or "Custom (Advanced)"). This is a known issue documented in [GitHub issue #253](https://github.com/pop-os/distinst/issues/253#issuecomment-3756167134).

The logs found in `/tmp/installer.log` showed:

```
probed "/dev/nvme0n2"
opening disk at /dev/nvme0n2
unable to open disk; creating new table on it
unable to probe devices: failed to create new partition table on "/dev/nvme0n2"
```

The issue is that the Pop!_OS installer tries to probe all available disks, including `/dev/nvme0n2`, which is a proprietary Apple namespace that cannot be accessed. When the installer attempts to create a partition table on it, it fails and crashes the entire installer.

### Workaround

A workaround was shared by [tnorman42](https://github.com/tnorman42) in [their comment on GitHub issue #253](https://github.com/pop-os/distinst/issues/253#issuecomment-3756167134) that resolves the installer crash. The solution involves writing a default partition table to the problematic NVMe namespace that the installer can't access.

**DISCLAIMER:** Proceed at your own risk. This worked for me when installing Pop!_OS on a 2017 MacBook Pro.

Open Terminal and run:

```bash
fdisk /dev/nvme0n2
w
q
```

When fdisk complains about an unrecognized partition table, type `w` to write a default partition table, then `q` to quit. This creates a partition table on the dummy NVMe drive that appears on some MacBooks, allowing the installer to probe it without crashing.

Note that after applying this workaround, the installer may display incorrect drive space in the UI (showing roughly 1/10 of the actual capacity, like 56GB instead of 500GB). However, the installer will use the full disk size when creating partitions, so this is just a display bug and doesn't affect the actual installation.

This workaround unblocked the installation process and still allows booting from macOS, since macOS doesn't read Linux partitions on the internal drive.

## WiFi Drivers

WiFi was barely usable for me at first. It would sort of work, but only on 2.4GHz, and even then it was flaky.

Here's the WiFi hardware and driver I was dealing with:

```
benpotter@pop-os:~$ lspci -nnk | grep -A3 -i network
02:00.0 Network controller [0280]: Broadcom Inc. and subsidiaries BCM43602 802.11ac Wireless LAN SoC [14e4:43ba] (rev 02)
        Subsystem: Apple Inc. BCM43602 802.11ac Wireless LAN SoC [106b:0157]
        Kernel driver in use: brcmfmac
        Kernel modules: brcmfmac
```

To get it working reliably, I followed rob-hills' notes and added the Broadcom config file at: `/usr/lib/firmware/brcm/brcmfmac43602-pcie.txt`. See: [rob-hills' gist](https://gist.github.com/rob-hills/9134b7352ee7471c4d4f4fbd6454c4b9).

## Helpful resources

- [Pop!_OS installer crash on Macs (distinst issue #253 comment)](https://github.com/pop-os/distinst/issues/253#issuecomment-3756167134) — ongoing discussion (as of Jan 2025) on improving the experience.

## Keybindings

I wanted to use the Command key (Super) instead of Control on Wayland. GNOME Tweaks didn't work for this, so I used [xremap](https://github.com/xremap/xremap).

My xremap config:

```yaml
modmap:
  - name: Global
    remap:
      Super_L: Control_L
```

And here's a not-ideal-but-good systemd service that waits a bit so devices have time to connect before xremap starts:

```ini
[Unit]
Description=xremap key remapping
After=display-manager.service
Wants=display-manager.service

[Service]
Type=simple
ExecStartPre=/bin/sleep 10
ExecStart=/usr/local/bin/xremap /home/benpotter/.config/xremap/config.yaml
Restart=on-failure
```

## Next steps

My next goal is to boot from a Thunderbolt hub (so I'm not juggling multiple cables). One guide I'm using as a starting point is: [Linux Mint forum thread on Thunderbolt boot](https://forums.linuxmint.com/viewtopic.php?t=439989).

*Last Updated: January 2025*
