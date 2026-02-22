import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = { title: "Ben Potter | Blog" };

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <hr />
      <main>
        <h2>Blog</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
