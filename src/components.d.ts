/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { marked } from "marked";
export namespace Components {
    interface AwesomeMarkdown {
        /**
          * The original markdown text to be parsed and displayed.
         */
        "markdown": string;
        /**
          * The options for markdown parser.
         */
        "parserOptions": marked.MarkedOptions;
    }
}
declare global {
    interface HTMLAwesomeMarkdownElement extends Components.AwesomeMarkdown, HTMLStencilElement {
    }
    var HTMLAwesomeMarkdownElement: {
        prototype: HTMLAwesomeMarkdownElement;
        new (): HTMLAwesomeMarkdownElement;
    };
    interface HTMLElementTagNameMap {
        "awesome-markdown": HTMLAwesomeMarkdownElement;
    }
}
declare namespace LocalJSX {
    interface AwesomeMarkdown {
        /**
          * The original markdown text to be parsed and displayed.
         */
        "markdown"?: string;
        /**
          * Occurs when the markdown is parsed.   In event detail, _result_ is the parsed HTML string  and _replaceResult_ is a callback that receives a new HTML string to replace the original result.
         */
        "onMarkdownParsed"?: (event: CustomEvent<{ result: string; replaceResult: (result: string) => void }>) => void;
        /**
          * The options for markdown parser.
         */
        "parserOptions"?: marked.MarkedOptions;
    }
    interface IntrinsicElements {
        "awesome-markdown": AwesomeMarkdown;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "awesome-markdown": LocalJSX.AwesomeMarkdown & JSXBase.HTMLAttributes<HTMLAwesomeMarkdownElement>;
        }
    }
}
