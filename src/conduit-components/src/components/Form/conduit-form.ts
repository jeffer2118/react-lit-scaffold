import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Form.js';

@customElement('conduit-form')
export class Form extends LitElement {
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) submitLabel = 'Submit';
  @property({ type: String }) resetLabel = 'Reset';

  private handleSubmit(e: Event) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('form-submit', {
      bubbles: true,
      composed: true
    }));
  }

  private handleReset() {
    this.dispatchEvent(new CustomEvent('form-reset', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <form class="usa-form" @submit=${this.handleSubmit}>
        <slot></slot>
        <div class="usa-form__actions">
          <button 
            type="submit" 
            class="usa-button"
            ?disabled=${this.disabled}
          >
            ${this.submitLabel}
          </button>
          <button 
            type="button" 
            class="usa-button usa-button--outline"
            ?disabled=${this.disabled}
            @click=${this.handleReset}
          >
            ${this.resetLabel}
          </button>
        </div>
      </form>
    `;
  }
}