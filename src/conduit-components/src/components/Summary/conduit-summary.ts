import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Summary.js';

interface SummaryItem {
  label: string;
  value: string;
  highlight?: boolean;
}

@customElement('conduit-summary')
export class Summary extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: Array }) items: SummaryItem[] = [];
  @property({ type: String }) variant: 'default' | 'bordered' | 'compact' = 'default';

  render() {
    const variantClass = this.variant !== 'default' ? `usa-summary--${this.variant}` : '';

    return html`
      <style>
        ${style}
      </style>
      <div class="usa-summary ${variantClass}">
        ${this.title ? html`
          <h3 class="usa-summary__heading">${this.title}</h3>
        ` : ''}
        <div class="usa-summary__list">
          ${this.items.map(item => html`
            <div class="usa-summary__item">
              <div class="usa-summary__item-heading">${item.label}</div>
              <div class="usa-summary__item-detail ${item.highlight ? 'usa-summary__item-detail--highlight' : ''}">
                ${item.value}
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}