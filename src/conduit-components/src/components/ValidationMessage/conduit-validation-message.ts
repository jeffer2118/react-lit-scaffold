import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/ValidationMessage.js';

@customElement('conduit-validation-message')
export class ValidationMessage extends LitElement {
  @property({ type: String }) message = '';
  @property({ type: String }) type: 'error' | 'warning' | 'success' = 'error';
  @property({ type: Boolean }) visible = true;

  render() {
    if (!this.visible) return html``;

    const typeClass = `usa-alert--${this.type}`;

    return html`
      <style>
        ${style}
      </style>
      <div class="usa-alert ${typeClass} usa-alert--validation" role="alert">
        <div class="usa-alert__body">
          <p class="usa-alert__text">
            ${this.message}
          </p>
        </div>
      </div>
    `;
  }
}