import { Component, Host, h, ComponentInterface, Prop, Element } from '@stencil/core';
import { marked } from 'marked';

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

  componentDidRender() {
    this.hostElement.shadowRoot.innerHTML = marked.parse(this.markdown || '');
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
