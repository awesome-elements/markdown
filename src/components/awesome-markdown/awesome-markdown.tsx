import { Component, Host, h, ComponentInterface } from '@stencil/core';

@Component({
  tag: 'awesome-markdown',
  styleUrl: 'awesome-markdown.css',
  shadow: true,
})
export class AwesomeMarkdown implements ComponentInterface {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
