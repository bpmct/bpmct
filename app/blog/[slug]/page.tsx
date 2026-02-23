import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getPostBySlug(slug);
    return { title: `Ben Potter | ${meta.title}` };
  } catch {
    return { title: "Ben Potter | Blog" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <Header />
      <hr />
      <main>
        <h1>{post.meta.title}</h1>
        <p style={{ color: "#666", fontSize: "0.9em", marginTop: "-0.5em", marginBottom: "1.5em" }}>
          {new Date(post.meta.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          {Math.abs(new Date(post.meta.lastUpdated).getTime() - new Date(post.meta.date).getTime()) > 7 * 86400000 && (
            <> · Last updated {new Date(post.meta.lastUpdated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</>
          )}
        </p>
        <MDXRemote
          source={post.content.replace(/^#\s+.+\n*/m, "")}
          components={{
            a: (props) => {
              const isExternal = props.href?.startsWith("http");
              return isExternal
                ? <a {...props} target="_blank" rel="noopener noreferrer" />
                : <a {...props} />;
            },
          }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                [rehypePrettyCode, { theme: "github-dark-dimmed", keepBackground: true }],
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: "prepend" }],
              ],
            },
          }}
        />
      </main>
    </>
  );
}
