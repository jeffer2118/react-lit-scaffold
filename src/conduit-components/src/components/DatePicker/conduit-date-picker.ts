import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/DatePicker.js';

@customElement('conduit-date-picker')
export class DatePicker extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: String }) min = '';
  @property({ type: String }) max = '';
  @property({ type: Boolean }) disabled = false;

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('change', {
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
      <div class="usa-date-picker">
        <input
          class="usa-input"
          type="date"
          name="date"
          value="${this.value}"
          min="${this.min}"
          max="${this.max}"
          ?disabled=${this.disabled}
          @input=${this.handleInput}
        />
      </div>
    `;
  }
}