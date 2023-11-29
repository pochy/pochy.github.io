import { FC } from "react";
import ReactMarkdown, { ExtraProps } from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import ruby from "react-syntax-highlighter/dist/cjs/languages/prism/ruby";
import php from "react-syntax-highlighter/dist/cjs/languages/prism/php";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import go from "react-syntax-highlighter/dist/cjs/languages/prism/go";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkEmoji from "remark-emoji";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import "katex/dist/katex.min.css";
import PostImage from "./ui/post-image";
import { Mermaid } from "@/components/editor/Mermaid";
import React from "react";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("ruby", ruby);
SyntaxHighlighter.registerLanguage("php", php);
SyntaxHighlighter.registerLanguage("md", markdown);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("go", go);
SyntaxHighlighter.registerLanguage("golang", go);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("css", css);

type MarkdownProps = {
  slug: string;
  children?: string | null | undefined;
  // children: React.ReactNode;
};

const Markdown: FC<MarkdownProps> = ({ slug, children }) => {
  const Pre = ({
    children,
    ...props
  }: React.ClassAttributes<HTMLPreElement> &
    React.HTMLAttributes<HTMLPreElement> &
    ExtraProps) => {
    if (!children || typeof children !== "object") {
      return (
        <code {...props} className="rounded-md bg-stone-200 text-red-600">
          {children}
        </code>
      );
    }
    const childType = "type" in children ? children.type : "";
    if (childType !== "code") {
      return (
        <code {...props} className="rounded-md bg-stone-200 text-red-600">
          {children}
        </code>
      );
    }

    const childProps = "props" in children ? children.props : {};
    const { className, children: code } = childProps;
    const classList = className ? className.split(":") : [];
    const language = classList[0]?.replace("language-", "");
    const fileName = classList[1];
    if (language === "mermaid") {
      return <Mermaid>{code}</Mermaid>;
    }
    return (
      <React.Fragment>
        {fileName && (
          <div className="bg-slate-950 text-slate-200 py-2 px-3 text-xs rounded-t">
            <span>{fileName}</span>
          </div>
        )}
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          customStyle={
            fileName
              ? {
                  marginTop: 0,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                }
              : {}
          }
        >
          {String(code).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </React.Fragment>
    );
  };

  // const html = markdownHtml(children?.toString() || "");
  // return (
  //   // Reactの場合
  //   <div
  //     // "znc"というクラス名を指定する
  //     className="znc"
  //     // htmlを渡す
  //     dangerouslySetInnerHTML={{
  //       __html: html,
  //     }}
  //   />
  // );

  return (
    <ReactMarkdown
      className="prose prose-sky mx-auto max-w-4xl"
      components={{
        pre: Pre,
        img: PostImage(slug),
      }}
      remarkPlugins={[remarkGfm, remarkMath, remarkEmoji, remarkToc]}
      rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeKatex, rehypeSlug]}
    >
      {children}
    </ReactMarkdown>
  );

  // const MarkdownComponents: object = {
  //   // SyntaxHighlight code will go here
  //   code({ children, className, node, ...rest }) {
  //     // const { children, className, node, ...rest } = props;
  //     const match = /language-(\w+)/.exec(className || "");
  //     return match ? (
  //       <SyntaxHighlighter
  //         {...rest}
  //         style={oneDark}
  //         language={match[1]}
  //         PreTag="div"
  //       >
  //         {String(children).replace(/\n$/, "")}
  //       </SyntaxHighlighter>
  //     ) : (
  //       <code {...rest} className={className}>
  //         {children}
  //       </code>
  //     );
  //   },
  // };
  // return (
  //   <ReactMarkdown components={MarkdownComponents}>{children}</ReactMarkdown>
  // );
};

export default Markdown;
