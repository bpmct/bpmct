import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = { title: "Ben Potter | Blog" };

export default function BlogPage() {
  const posts = getAllPosts();

  // Group posts by category
  const grouped = new Map<string, typeof posts>();
  for (const post of posts) {
    const cat = post.category ?? "Other";
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat)!.push(post);
  }

  return (
    <>
      <Header />
      <hr />
      <main>
        <h2>Blog</h2>
        {[...grouped.entries()].map(([category, categoryPosts]) => (
          <section key={category}>
            <h3 style={{ fontSize: "1.1em", fontWeight: 600 }}>{category}</h3>
            <ul>
              {categoryPosts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p style={{ marginTop: "2em", fontSize: "0.9em" }}>
          <a href="/feed.xml">RSS Feed</a>
        </p>
      </main>
    </>
  );
}
