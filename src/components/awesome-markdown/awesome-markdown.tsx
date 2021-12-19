import { Component, Host, h, ComponentInterface, Prop, Element } from '@stencil/core';
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
