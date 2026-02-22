import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = { title: "Ben Potter | Hobbies" };

export default function HobbiesPage() {
  return (
    <>
      <Header />
      <hr />
      <main>
        <h2>My Hobbies</h2>
        <p>
          I have recently gotten into{" "}
          <a href="https://ebird.org/profile/NTkyOTAwMA" target="_blank">
            birding
          </a>
          .
        </p>

        <h3>Trips</h3>
        <p>
          Specifically, I like going new places and talking to people who live
          there. Road trips within the USA or traveling abroad are equally
          exciting to me.
        </p>

        <h3>Outdoorsy Shit</h3>
        <p>Camping, hiking, swimming, surfing, and recently birding. 🤓</p>

        <h3>Working Out</h3>
        <p>
          I play water polo, rock climb, swim, lift weights, surf, and
          occasionally play pickleball.
        </p>

        <h3>Tinkering</h3>
        <p>
          I like to write software, play with embedded hardware, and tinker with
          my homelab.
        </p>
        <p>Some of my recent tinker projects:</p>
        <ul>
          <li>
            <strong>Tio</strong>: A WiFi-connected thermal printer with two
            physical buttons. Buttons can be programmed to do various things,
            such as print random poems and quotes.
          </li>
          <li>
            <strong>Birding</strong>: I use old devices and ESP32-CAMs to record
            videos when birds come by my feeders. I use ZoneMinder to capture
            videos and BirdNET-Pi to capture and identify audio recordings of
            nearby birds.
          </li>
          <li>
            <strong>Neighborhood Events</strong>: I&apos;m working on an
            application that finds upcoming events in any neighborhood.
          </li>
        </ul>
      </main>
    </>
  );
}
