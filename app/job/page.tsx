import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = { title: "Ben Potter | Job" };

export default function JobPage() {
  return (
    <>
      <Header />
      <hr />
      <main>
        <h2>My Job</h2>
        <p>I work in Product at Coder.com.</p>

        <h3>About Product</h3>
        <p>
          Product at Coder helps figure out what software we are going to develop
          next, such as new features, bug fixes, or even new products.
        </p>

        <h3>About Coder.com</h3>
        <p>
          Coder is an enterprise self-hosted cloud development environment
          software company. Let&apos;s break this down:
        </p>
        <ul>
          <li>
            <strong>enterprise</strong>: while we have many{" "}
            <a href="https://github.com/coder" target="_blank">
              open source projects
            </a>
            , we sell software to large enterprise companies such as Discord and
            Goldman Sachs.
          </li>
          <li>
            <strong>self-hosted</strong>: we provide the software, our users run
            it on own servers they own (e.g. their datacenters) or rent (e.g.
            AWS).
          </li>
          <li>
            <strong>cloud development environment</strong>: instead of coding
            directly on local desktops and laptops, developers can use a{" "}
            <a
              href="https://www.google.com/search?q=cloud+development+environment"
              target="_blank"
            >
              cloud development environment
            </a>
            .
          </li>
          <li>
            <strong>software company</strong>: our main revenue source is
            software sales. Coder is also{" "}
            <a
              href="https://www.google.com/search?q=coder+funding+rounds"
              target="_blank"
            >
              venture capital funded
            </a>
            .
          </li>
        </ul>

        <h3>Exciting Challenges</h3>
        <p>
          These aren&apos;t necessarily things I&apos;m good or bad at, but
          instead things I enjoy working on improving.
        </p>
        <ul>
          <li>
            <strong>Communication</strong>: Most of my work days are spent
            listening, thinking, writing, and talking. Probably not in that
            order.
          </li>
          <li>
            <strong>Development</strong>: I work with smart people and unique
            challenges every week, leaving plenty of room for learning and
            personal development.
          </li>
          <li>
            <strong>Patience</strong>: Even in a startup, most changes
            don&apos;t happen over just a day and they probably shouldn&apos;t.
            We take pride in our work and should encourage thoughtfulness and
            quality products.
          </li>
        </ul>

        <h3>Thoughts?</h3>
        <p>
          I like talking about my work and the space that we&apos;re in. Feel
          free to{" "}
          <a href="https://linkedin.com/in/bpmct" target="_blank">
            reach out
          </a>{" "}
          to me. Would love to talk shop or get feedback on what information
          would be helpful here.
        </p>
      </main>
    </>
  );
}
