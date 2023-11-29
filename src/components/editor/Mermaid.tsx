"use client";

import mermaid, { RenderResult } from "mermaid";
import React from "react";
import ReactMarkdown, { ExtraProps } from "react-markdown";

const randomid = () => parseInt(String(Math.random() * 1e15), 10).toString(36);

export const Mermaid = ({
  children,
  ...props
}: React.ClassAttributes<HTMLPreElement> &
  React.HTMLAttributes<HTMLPreElement> &
  ExtraProps) => {
  const demoid = React.useRef(`dome${randomid()}`);
  const code = children as string;
  const [html, setHTML] = React.useState<RenderResult | undefined>();

  const demo = React.useRef(null);
  React.useEffect(() => {
    const render = async () => {
      if (demo.current) {
        try {
          const html = await mermaid.render(demoid.current, code);
          setHTML(html);
          // @ts-ignore
          demo.current.innerHTML = html.svg;
          // @ts-ignore
          // demo.current.innerHTML = html.svg;
        } catch (error) {
          // @ts-ignore
          demo.current.innerHTML = error;
        }
      }
    };
    render();
  }, [code]);

  if (typeof code === "string") {
    return (
      <div ref={demo}>
        <code style={{ display: "none" }} />
      </div>
    );
  }
  if (html) {
    return <div dangerouslySetInnerHTML={{ __html: html.svg }} />;
  }
  return <code className="noMermaid">{children}</code>;
};

export default Mermaid;
