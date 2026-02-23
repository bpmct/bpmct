import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = { title: "Ben Potter | Projects" };

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <hr />
      <main>
        <h2>Projects</h2>
        <p>Coming soon.</p>
      </main>
    </>
  );
}
