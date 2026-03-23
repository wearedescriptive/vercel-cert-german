import ReactMarkdown from "react-markdown";

import { ContentBlock } from "@/lib/definitions";

export function ArticleBody({ content }: { content: ContentBlock[] }) {
  return (
    <div className="mt-8 space-y-4 text-neutral-800 leading-relaxed">
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
                className="mt-8 text-2xl font-bold text-neutral-900"
              >
                {block.text}
              </h2>
            ) : (
              <h3
                key={block.text}
                className="mt-6 text-xl font-bold text-neutral-900"
              >
                {block.text}
              </h3>
            );
          case "blockquote":
            return (
              <blockquote
                key={block.text}
                className="border-l-4 border-neutral-200 pl-4 italic text-neutral-500"
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
