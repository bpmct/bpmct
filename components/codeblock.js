import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeBlock = (props) => {
  const match = /language-(\w+)/.exec(props.className || "");
  return (
    <SyntaxHighlighter
      style={dracula}
      showLineNumbers={true}
      // language={match[1]}
      PreTag="div"
      CodeTag="code"
      {...props}
    >
      {String(props.children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
