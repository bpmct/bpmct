import type { Metadata } from "next";
import Header from "@/components/Header";
import AnchorLink from "@/components/AnchorLink";

export const metadata: Metadata = {
  title: "Ben Potter | PopOS on a 2017 13-inch MacBook Pro",
};

export default function MacBookProBlogPost() {
  return (
    <>
      <Header />
      <hr />
      <main>
        <h2>PopOS on a 2017 MacBook Pro</h2>
        <p>
          Running Pop!_OS on a 2017 MacBook Pro was more difficult than I had
          expected, so I figured I&apos;d document my my findings in hope that it
          would be useful to others.
        </p>

        <h3 id="methodology">
          <AnchorLink id="methodology" />
          Methodology
        </h3>
        <p>
          My methodology was to install Pop!_OS on an external SATA disk over
          USB3 to preserve the original hard drive. This way, I can still boot
          from macOS if needed. I ultimately hope to boot from a Thunderbolt hub
          versus having 2 cables plugged in.
        </p>

        <h3 id="fixing-the-installer-crash">
          <AnchorLink id="fixing-the-installer-crash" />
          Fixing the Installer Crash
        </h3>
        <p>
          The installer would immediately crash when picking an install method
          (at the screen that shows &quot;Clean Install&quot; or &quot;Custom
          (Advanced)&quot;). This is a known issue documented in{" "}
          <a
            href="https://github.com/pop-os/distinst/issues/253#issuecomment-3756167134"
            target="_blank"
          >
            GitHub issue #253
          </a>
          .
        </p>
        <p>
          The logs found in <code>/tmp/installer.log</code> showed:
        </p>
        <pre>
          <code>{`probed "/dev/nvme0n2"
opening disk at /dev/nvme0n2
unable to open disk; creating new table on it
unable to probe devices: failed to create new partition table on "/dev/nvme0n2"`}</code>
        </pre>
        <p>
          The issue is that the Pop!_OS installer tries to probe all available
          disks, including <code>/dev/nvme0n2</code>, which is a proprietary
          Apple namespace that cannot be accessed. When the installer attempts to
          create a partition table on it, it fails and crashes the entire
          installer.
        </p>

        <h4 id="workaround">
          <AnchorLink id="workaround" />
          Workaround
        </h4>
        <p>
          A workaround was shared by{" "}
          <a href="https://github.com/tnorman42" target="_blank">
            tnorman42
          </a>{" "}
          in{" "}
          <a
            href="https://github.com/pop-os/distinst/issues/253#issuecomment-3756167134"
            target="_blank"
          >
            their comment on GitHub issue #253
          </a>{" "}
          that resolves the installer crash. The solution involves writing a
          default partition table to the problematic NVMe namespace that the
          installer can&apos;t access.
        </p>
        <p>
          <strong>DISCLAIMER:</strong> Proceed at your own risk. This worked for
          me when installing Pop!_OS on a 2017 MacBook Pro.
        </p>
        <p>Open Terminal and run:</p>
        <pre>
          <code>{`fdisk /dev/nvme0n2
w
q`}</code>
        </pre>
        <p>
          When fdisk complains about an unrecognized partition table, type{" "}
          <code>w</code> to write a default partition table, then <code>q</code>{" "}
          to quit. This creates a partition table on the dummy NVMe drive that
          appears on some MacBooks, allowing the installer to probe it without
          crashing.
        </p>
        <p>
          Note that after applying this workaround, the installer may display
          incorrect drive space in the UI (showing roughly 1/10 of the actual
          capacity, like 56GB instead of 500GB). However, the installer will use
          the full disk size when creating partitions, so this is just a display
          bug and doesn&apos;t affect the actual installation.
        </p>
        <p>
          This workaround unblocked the installation process and still allows
          booting from macOS, since macOS doesn&apos;t read Linux partitions on
          the internal drive.
        </p>

        <h3 id="wifi-drivers">
          <AnchorLink id="wifi-drivers" />
          WiFi Drivers
        </h3>
        <p>
          WiFi was barely usable for me at first. It would sort of work, but only
          on 2.4GHz, and even then it was flaky.
        </p>
        <p>Here&apos;s the WiFi hardware and driver I was dealing with:</p>
        <pre>
          <code>{`benpotter@pop-os:~$ lspci -nnk | grep -A3 -i network
02:00.0 Network controller [0280]: Broadcom Inc. and subsidiaries BCM43602 802.11ac Wireless LAN SoC [14e4:43ba] (rev 02)
        Subsystem: Apple Inc. BCM43602 802.11ac Wireless LAN SoC [106b:0157]
        Kernel driver in use: brcmfmac
        Kernel modules: brcmfmac`}</code>
        </pre>
        <p>
          To get it working reliably, I followed rob-hills&apos; notes and added
          the Broadcom config file at:{" "}
          <code>/usr/lib/firmware/brcm/brcmfmac43602-pcie.txt</code>. See:{" "}
          <a
            href="https://gist.github.com/rob-hills/9134b7352ee7471c4d4f4fbd6454c4b9"
            target="_blank"
          >
            rob-hills&apos; gist
          </a>
          .
        </p>

        <h3 id="helpful-resources">
          <AnchorLink id="helpful-resources" />
          Helpful resources
        </h3>
        <ul>
          <li>
            <a
              href="https://github.com/pop-os/distinst/issues/253#issuecomment-3756167134"
              target="_blank"
            >
              Pop!_OS installer crash on Macs (distinst issue #253 comment)
            </a>{" "}
            — ongoing discussion (as of Jan 2025) on improving the experience.
          </li>
        </ul>

        <h3 id="keybindings">
          <AnchorLink id="keybindings" />
          Keybindings
        </h3>
        <p>
          I wanted to use the Command key (Super) instead of Control on Wayland.
          GNOME Tweaks didn&apos;t work for this, so I used{" "}
          <a href="https://github.com/xremap/xremap" target="_blank">
            xremap
          </a>
          .
        </p>
        <p>My xremap config:</p>
        <pre>
          <code>{`modmap:
  - name: Global
    remap:
      Super_L: Control_L`}</code>
        </pre>
        <p>
          And here&apos;s a not-ideal-but-good systemd service that waits a bit
          so devices have time to connect before xremap starts:
        </p>
        <pre>
          <code>{`[Unit]
Description=xremap key remapping
After=display-manager.service
Wants=display-manager.service

[Service]
Type=simple
ExecStartPre=/bin/sleep 10
ExecStart=/usr/local/bin/xremap /home/benpotter/.config/xremap/config.yaml
Restart=on-failure`}</code>
        </pre>

        <h3 id="next-steps">
          <AnchorLink id="next-steps" />
          Next steps
        </h3>
        <p>
          My next goal is to boot from a Thunderbolt hub (so I&apos;m not
          juggling multiple cables). One guide I&apos;m using as a starting point
          is:{" "}
          <a
            href="https://forums.linuxmint.com/viewtopic.php?t=439989"
            target="_blank"
          >
            Linux Mint forum thread on Thunderbolt boot
          </a>
          .
        </p>
        <p>
          <em>Last Updated: January 2025</em>
        </p>
      </main>
    </>
  );
}
