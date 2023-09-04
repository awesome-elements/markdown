/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../components/markdown";
import { MarkdownParsedEventDetail } from "../components/markdown";
import { Marked, MarkedExtension, MarkedOptions } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

type MyArgs = {
  onMarkdownParsed: (event: CustomEvent<MarkdownParsedEventDetail>) => void;
  markdown?: string;
  parserOptions?: MarkedOptions;
  extensions?: MarkedExtension[];
};

export default {
  title: "Components/Markdown",
  component: "awesome-markdown",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onMarkdownParsed: { action: "markdownParsed" },
  },
  render: (args) =>
    html`<awesome-markdown
      markdown=${args.markdown ?? ""}
      .parserOptions=${args.parserOptions as any}
      .extensions=${args.extensions as any}
      @markdownParsed=${args.onMarkdownParsed}
    >
      <style>
        ::part(container) {
          font-family: arial;
          background: hsl(0, 0%, 98%);
          padding: 1rem;
        }
      </style>
    </awesome-markdown>`,
} satisfies Meta<MyArgs>;

new Marked();

export const PlainText: StoryObj<MyArgs> = {
  name: "Plain Text",
  args: {
    markdown: "Hello World!",
  },
};

export const Headers: StoryObj<MyArgs> = {
  name: "Headers",
  args: {
    markdown: "# Header 1\n## Header 2\n### Header 3\nNormal content...",
  },
};

export const Codes: StoryObj<MyArgs> = {
  name: "Codes",
  args: {
    markdown: "```javascript\nvar x = 1;\nvar y = x + x;\n```",
    extensions: [
      markedHighlight({
        langPrefix: "hljs language-",
        highlight: (code, lang) => {
          const language = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(code, { language }).value;
        },
      }),
    ],
  },
};
