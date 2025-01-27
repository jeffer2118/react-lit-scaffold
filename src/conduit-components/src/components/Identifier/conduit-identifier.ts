import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Identifier.js';

@customElement('conduit-identifier')
export class Identifier extends LitElement {
  @property({ type: String }) text = '';
  @property({ type: String }) type: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' = 'primary';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean }) removable = false;
  @property({ type: String }) prefix = '';
  @property({ type: String }) suffix = '';

  private handleRemove() {
    this.dispatchEvent(new CustomEvent('remove', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const typeClass = `usa-identifier--${this.type}`;
    const sizeClass = this.size !== 'medium' ? `usa-identifier--${this.size}` : '';

    return html`
      <style>
        ${style}
      </style>
      <span class="usa-identifier ${typeClass} ${sizeClass}">
        ${this.prefix ? html`
          <span class="usa-identifier__prefix">${this.prefix}</span>
        ` : ''}
        
        <span class="usa-identifier__text">${this.text}</span>
        
        ${this.suffix ? html`
          <span class="usa-identifier__suffix">${this.suffix}</span>
        ` : ''}

        ${this.removable ? html`
          <button
            class="usa-identifier__remove"
            type="button"
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