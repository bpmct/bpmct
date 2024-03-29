import Head from "next/head";
import CodeBlock from "../../components/codeblock";
import CustomLink from "../../components/customlink";

// markdown parsing stuff (kinda obvious though)
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

export default function Home({ html }) {
  return (
    <div className="m-8">
      <Head>
        <title>projects: bpmct</title>
        <meta name="description" content="My projects" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-touch-icon.png"
        />
      </Head>
      <article className="prose lg:prose-2xl selection:text-white dark:prose-dark selection:bg-purple-800">
        <MDXRemote components={{ code: CodeBlock, a: CustomLink }} {...html} />
      </article>
    </div>
  );
}

export async function getStaticProps() {
  let markdown;

  if (process.env.NODE_ENV == "production") {
    const res = await fetch(
      "https://raw.githubusercontent.com/bpmct/bpmct/main/projects/README.md"
    );
    markdown = await res.text();
  } else {
    const readFile = await import("../../projects/README.md");
    markdown = readFile.default;
  }

  // remove markdown-only content
  markdown = markdown.replace(
    /<!-- WEB_EXCLUDE -->[\s\S]*<!-- END_WEB_EXCLUDE -->/g,
    ""
  );

  const mdxSource = await serialize(markdown, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  });

  return {
    props: {
      html: mdxSource || "Error loading the markdown",
    },
  };
}
