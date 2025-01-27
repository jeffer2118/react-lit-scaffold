import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Checkbox.js';

@customElement('conduit-checkbox')
export class Checkbox extends LitElement {
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) name = '';
  @property({ type: String }) value = '';

  private handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.checked = target.checked;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { checked: this.checked },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <div class="usa-checkbox">
        <input
          class="usa-checkbox__input"
          type="checkbox"
          name="${this.name}"
          value="${this.value}"
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.handleChange}
          id="checkbox-${this.name}"
        />
        <label class="usa-checkbox__label" for="checkbox-${this.name}">
          <slot></slot>
        </label>
      </div>
    `;
  }
}