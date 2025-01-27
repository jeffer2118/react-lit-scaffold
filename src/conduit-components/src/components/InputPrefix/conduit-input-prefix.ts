import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/InputPrefix.js';

@customElement('conduit-input-prefix')
export class InputPrefix extends LitElement {
  @property({ type: String }) prefix = '';
  @property({ type: String }) suffix = '';
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) type = 'text';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: String }) label = '';
  @property({ type: String }) errorMessage = '';

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <div class="usa-form-group ${this.errorMessage ? 'usa-form-group--error' : ''}">
        ${this.label ? html`
          <label class="usa-label ${this.errorMessage ? 'usa-label--error' : ''}" for="input-prefix">
            ${this.label}
            ${this.required ? html`<span class="usa-label--required">required</span>` : ''}
          </label>
        ` : ''}
        
        ${this.errorMessage ? html`
          <span class="usa-error-message" role="alert">${this.errorMessage}</span>
        ` : ''}

        <div class="usa-input-prefix-suffix">
          ${this.prefix ? html`
            <div class="usa-input-prefix" aria-hidden="true">
              ${this.prefix}
            </div>
          ` : ''}

          <input
            class="usa-input ${this.errorMessage ? 'usa-input--error' : ''}"
            id="input-prefix"
            type="${this.type}"
            .value="${this.value}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            aria-required="${this.required}"
            aria-invalid="${Boolean(this.errorMessage)}"
            @input="${this.handleInput}"
          />

          ${this.suffix ? html`
            <div class="usa-input-suffix" aria-hidden="true">
              ${this.suffix}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}