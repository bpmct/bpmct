import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = { title: "Ben Potter | Blog" };

export default function BlogPage() {
  return (
    <>
      <Header />
      <hr />
      <main>
        <h2>Blog</h2>
        <ul>
          <li>
            <Link href="/blog/2017-macbook-pro">
              PopOS on a 2017 MacBook Pro
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
}
