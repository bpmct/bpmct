import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = { title: "Ben Potter | About" };

export default function AboutPage() {
  return (
    <>
      <Header />
      <hr />
      <main>
        <h2>About</h2>
        <p>Coming soon.</p>
      </main>
    </>
  );
}
