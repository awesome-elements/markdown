import { LitElement, PropertyValueMap, css, html } from "lit";
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

  protected willUpdate(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ) {
    if (changedProperties.has("greeting") || changedProperties.has("name")) {
      this.dispatchEvent(
        new CustomEvent("contentChange", { detail: changedProperties })
      );
    }
  }

  render() {
    return html` <span>${this.greeting}, ${this.name}!</span> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "awesome-greeting": AwesomeGreetingElement;
  }
}
