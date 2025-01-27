import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Accordion.js';

@customElement('conduit-accordion')
export class Accordion extends LitElement {
  @property({ type: Boolean }) expanded = false;
  @property({ type: String }) heading = '';

  render() {
    return html`
      <style>
        ${style}
      </style>
      <div class="usa-accordion">
        <h4 class="usa-accordion__heading">
          <button
            class="usa-accordion__button"
            aria-expanded="${this.expanded}"
            aria-controls="accordion-content"
            @click=${() => this.expanded = !this.expanded}
          >
            <slot name="heading">${this.heading}</slot>
          </button>
        </h4>
        <div id="accordion-content" class="usa-accordion__content" ?hidden=${!this.expanded}>
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }
}