import { Component, Host, h, ComponentInterface, Prop, Element, Watch } from '@stencil/core';
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
    this.hostElement.shadowRoot.querySelector('body').innerHTML = marked.parse(this.markdown || '');
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
}
