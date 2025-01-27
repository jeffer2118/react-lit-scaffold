import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Tag.js';

@customElement('conduit-tag')
export class Tag extends LitElement {
  @property({ type: String }) text = '';
  @property({ type: String }) variant: 'default' | 'primary' | 'success' | 'warning' | 'error' = 'default';
  @property({ type: Boolean }) removable = false;

  private handleRemove() {
    this.dispatchEvent(new CustomEvent('remove', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const variantClass = this.variant !== 'default' ? `usa-tag--${this.variant}` : '';

    return html`
      <style>
        ${style}
      </style>
      <span class="usa-tag ${variantClass}">
        ${this.text}
        ${this.removable ? html`
          <button
            class="usa-tag__remove"
            aria-label="Remove ${this.text}"
            @click=${this.handleRemove}
          >
            <svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
              <use xlink:href="/assets/img/sprite.svg#close"></use>
            </svg>
          </button>
        ` : ''}
      </span>
    `;
  }
}