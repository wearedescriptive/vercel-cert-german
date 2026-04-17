import ReactMarkdown from "react-markdown";

import { ContentBlock } from "@/lib/definitions";

export function ArticleBody({ content }: { content: ContentBlock[] }) {
  return (
    <div className="mt-8 space-y-5 text-[1.0625rem] leading-[1.75] text-neutral-800">
      {content.map((block) => {
        switch (block.type) {
          case "paragraph":
            return (
              <div key={block.text} className="text-base">
                <ReactMarkdown>{block.text}</ReactMarkdown>
              </div>
            );
          case "heading":
            return block.level === 2 ? (
              <h2
                key={block.text}
                className="mt-10 text-2xl font-bold tracking-tight text-neutral-900"
              >
                {block.text}
              </h2>
            ) : (
              <h3
                key={block.text}
                className="mt-8 text-xl font-semibold tracking-tight text-neutral-900"
              >
                {block.text}
              </h3>
            );
          case "blockquote":
            return (
              <blockquote
                key={block.text}
                className="border-l-2 border-neutral-300 pl-5 italic text-neutral-600"
              >
                {block.text}
              </blockquote>
            );
          case "unordered-list":
            return (
              <ul key={block.items.join()} className="list-disc pl-5 space-y-1">
                {block.items.map((item) => (
                  <li key={item}>
                    <ReactMarkdown>{item}</ReactMarkdown>
                  </li>
                ))}
              </ul>
            );
          case "ordered-list":
            return (
              <ol
                key={block.items.join()}
                className="list-decimal pl-5 space-y-1"
              >
                {block.items.map((item) => (
                  <li key={item}>
                    <ReactMarkdown>{item}</ReactMarkdown>
                  </li>
                ))}
              </ol>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
