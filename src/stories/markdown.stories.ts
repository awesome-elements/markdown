/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../components/markdown";
import { MarkdownParsedEventDetail } from "../components/markdown";
import { Marked, MarkedExtension, MarkedOptions } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import hljsCSS from "highlight.js/styles/github.css?inline";
import modestCSS from "../assets/markdown-modest.css?inline";

type MyArgs = {
  onMarkdownParsed: (event: CustomEvent<MarkdownParsedEventDetail>) => void;
  markdown?: string;
  parserOptions?: MarkedOptions;
  extensions?: MarkedExtension[];
  styleSheets?: (string | CSSStyleSheet)[];
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
    markdown: { control: "text" },
  },
  render: (args) => html`
    <awesome-markdown
      markdown=${args.markdown ?? ""}
      .parserOptions=${args.parserOptions as any}
      .extensions=${args.extensions as any}
      .styleSheets=${args.styleSheets}
      @markdownParsed=${args.onMarkdownParsed}
    ></awesome-markdown>
  `,
} satisfies Meta<MyArgs>;

new Marked();

export const Default: StoryObj<MyArgs> = {
  name: "Default",
  args: {
    markdown: "# Header 1\n## Header 2\n### Header 3\nNormal content...",
  },
};

export const AdoptStyleSheet: StoryObj<MyArgs> = {
  name: "Adpot style sheet",
  args: {
    markdown: "# Header 1\n## Header 2\n### Header 3\nNormal content...",
    styleSheets: [modestCSS],
  },
};

export const ApplyStyleUsingPart: StoryObj<MyArgs> = {
  name: "Apply styles using ::part",
  args: {
    markdown: "# Header 1\n## Header 2\n### Header 3\nNormal content...",
  },
  render: (args) =>
    html`
      <style>
        .my-style::part(container) {
          color: blue;
        }
      </style>
      <awesome-markdown
        class="my-style"
        markdown=${args.markdown ?? ""}
        .parserOptions=${args.parserOptions as any}
        .extensions=${args.extensions as any}
        .styleSheets=${args.styleSheets}
        @markdownParsed=${args.onMarkdownParsed}
      ></awesome-markdown>
    `,
};

export const Codes: StoryObj<MyArgs> = {
  name: "Codes",
  args: {
    markdown:
      "```javascript\nvar x = 1;\nvar y = x ** 2;\nconsole.log(x, y);\n```",
    extensions: [
      markedHighlight({
        langPrefix: "hljs language-",
        highlight: (code, lang) => {
          const language = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(code, { language }).value;
        },
      }),
    ],
    styleSheets: [hljsCSS],
  },
};
