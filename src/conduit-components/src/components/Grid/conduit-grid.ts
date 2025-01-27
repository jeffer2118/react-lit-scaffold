import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Grid.js';

@customElement('conduit-grid')
export class Grid extends LitElement {
  @property({ type: Number }) columns = 12;
  @property({ type: String }) gap = '1';

  render() {
    return html`
      <style>
        ${style}
        .usa-grid {
          display: grid;
          grid-template-columns: repeat(${this.columns}, 1fr);
          gap: ${this.gap}rem;
        }
      </style>
      <div class="usa-grid">
        <slot></slot>
      </div>
    `;
  }
}