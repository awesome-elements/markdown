import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("awesome-greeting")
export class AwesomeGreetingElement extends LitElement {
  static styles = css`
    span {
      font-size: 2em;
    }
  `;

  @property()
  greeting = "Hello";

  @property()
  name = "Somebody";

  render() {
    return html` <span>${this.greeting}, ${this.name}!</span> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "awesome-greeting": AwesomeGreetingElement;
  }
}
