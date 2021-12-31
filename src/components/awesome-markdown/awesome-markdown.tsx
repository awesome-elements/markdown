import { Component, Host, h, ComponentInterface, Prop, Element, Watch, Event, EventEmitter } from '@stencil/core';
import { marked } from 'marked';
import { observeMutation } from '@awesome-elements/utils';

@Component({
  tag: 'awesome-markdown',
  styleUrl: 'awesome-markdown.css',
  shadow: true,
})
export class AwesomeMarkdown implements ComponentInterface {
  @Element() hostElement: HTMLAwesomeMarkdownElement;

  /**
   * The original markdown text to be parsed and displayed.
   */
  @Prop() markdown: string;

  /**
   * The options for markdown parser.
   */
  @Prop() parserOptions: marked.MarkedOptions;

  @Watch('parserOptions')
  parserOptionsChanged(parserOptions: marked.MarkedOptions) {
    marked.setOptions(parserOptions);
  }

  /**
   * Occurs when the markdown is parsed.  
   * In event detail, _result_ is the parsed HTML string 
   * and _replaceResult_ is a callback that receives a new HTML string to replace the original result.
   */
  @Event() markdownParsed: EventEmitter<{ result: string; replaceResult: (result: string) => void }>;

  componentWillLoad() {
    this.parserOptionsChanged(this.parserOptions);
  }

  componentDidLoad() {
    observeMutation.call(this, this.hostElement, [this.updateStyle], {
      childList: true,
      subtree: true,
    });
    this.updateStyle();
  }

  componentDidRender() {
    this.hostElement.shadowRoot.querySelector('body').innerHTML = this.parseMarkdown();
  }

  render() {
    return (
      <Host>
        <html>
          <head></head>
          <body></body>
        </html>
      </Host>
    );
  }

  private updateStyle() {
    const templateElement = this.hostElement.querySelector('template');
    const templateContent = templateElement?.content.cloneNode(true);
    this.hostElement.shadowRoot.querySelector('head').innerHTML = '';
    this.hostElement.shadowRoot.querySelector('head').append(templateContent);
  }

  private parseMarkdown() {
    let result = marked.parse(this.markdown || '');
    const replaceResult = (newResult: string) => (result = newResult);
    this.markdownParsed.emit({ result, replaceResult });
    return result;
  }
}
