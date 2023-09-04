import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { until } from "lit/directives/until.js";
import { Marked, MarkedExtension, MarkedOptions, setOptions } from "marked";

export type MarkdownParsedEventDetail = {
  result?: string;
  replaceResult: (newResult: string) => string;
};

/**
 * A sample greeting component.
 * @csspart container - The inner container for markdown content.
 * @fires markdownParsed - Occurs when the markdown is parsed. In event detail, _result_ is the parsed HTML string  and _replaceResult_ is a callback that receives a new HTML string to replace the original result.
 */
@customElement("awesome-markdown")
export class AwesomeMarkdownElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: auto;
      width: auto;
    }

    [part~="container"] {
      display: block;
      position: relative;
      height: auto;
      width: auto;
    }
  `;

  /**
   * @internal
   */
  #markedInstance?: Marked;

  /**
   * The original markdown text to be parsed and displayed.
   */
  @property()
  markdown?: string;

  /**
   * @internal
   */
  #parserOptions?: MarkedOptions;
  /**
   * The options for marked parser. See [marked](https://marked.js.org/).
   */
  get parserOptions() {
    return this.#parserOptions;
  }
  @property({ type: Object, attribute: "parser-options" }) set parserOptions(
    parserOptions: MarkedOptions | undefined
  ) {
    setOptions((this.#parserOptions = parserOptions) ?? {});
  }

  /**
   * @internal
   */
  #extensions?: MarkedExtension[];
  /**
   * The extensions for marked. See [marked](https://marked.js.org/).
   */
  get extensions() {
    return this.#extensions;
  }
  @property({ type: Array, attribute: false }) set extensions(
    extensions: MarkedExtension[] | undefined
  ) {
    this.#extensions = extensions;
    this.#markedInstance = new Marked(...(extensions ?? []));
  }

  render() {
    return html`
      <div part="container" .innerHTML=${until(this.#parseMarkdown(), '')}></div>
    `;
  }

  #parseMarkdown() {
    let result = this.#markedInstance?.parse(this.markdown ?? "");
    const replaceResult = (newResult: string) => (result = newResult);
    this.dispatchEvent(
      new CustomEvent("markdownParsed", {
        detail: { result, replaceResult } as MarkdownParsedEventDetail,
      })
    );
    return result;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "awesome-markdown": AwesomeMarkdownElement;
  }
}
