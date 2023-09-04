import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { until } from "lit/directives/until.js";
import { Marked, MarkedExtension, MarkedOptions, setOptions } from "marked";

export type MarkdownParsedEventDetail = {
  result?: string;
  replaceResult: (newResult: string) => string;
};

/**
 * It helps to display markdown contents with ease. Built on top of [marked](https://marked.js.org/).
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
  #markedInstance: Marked = new Marked();
  /**
   * @internal
   */
  #defaultStyleSheets?: CSSStyleSheet[];

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
  get parserOptions(): MarkedOptions | undefined {
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
  get extensions(): MarkedExtension[] | undefined {
    return this.#extensions;
  }
  @property({ type: Array, attribute: false }) set extensions(
    extensions: MarkedExtension[] | undefined
  ) {
    this.#extensions = extensions;
    this.#markedInstance = new Marked(...(extensions ?? []));
  }

  /**
   * @internal
   */
  #styleSheets?: (string | CSSStyleSheet)[];
  /**
   * Style sheets to be applied.
   */
  get styleSheets(): (string | CSSStyleSheet)[] | undefined {
    return this.#styleSheets;
  }
  @property({ type: Array, attribute: false }) set styleSheets(
    styleSheets: (string | CSSStyleSheet)[] | undefined
  ) {
    if (!this.#defaultStyleSheets) {
      this.#defaultStyleSheets = this.shadowRoot?.adoptedStyleSheets ?? [];
    }
    this.#styleSheets = styleSheets;
    if (!this.shadowRoot) {
      return;
    }
    const processedStyleSheets =
      styleSheets?.map((styleSheetOrString) => {
        let styleSheet: CSSStyleSheet;
        if (typeof styleSheetOrString === "string") {
          styleSheet = new CSSStyleSheet();
          styleSheet.replaceSync(styleSheetOrString);
        } else {
          styleSheet = styleSheetOrString;
        }
        return styleSheet;
      }) ?? [];
    this.shadowRoot.adoptedStyleSheets = [
      ...this.#defaultStyleSheets,
      ...processedStyleSheets,
    ];
  }

  protected firstUpdated() {
    // eslint-disable-next-line no-self-assign
    this.styleSheets = this.styleSheets;
  }

  render() {
    return html`
      <div
        part="container"
        .innerHTML=${until(this.#parseMarkdown() ?? "")}
      ></div>
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
