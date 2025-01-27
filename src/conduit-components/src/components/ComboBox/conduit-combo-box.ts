import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/ComboBox.js';

interface ComboBoxOption {
  value: string;
  label: string;
}

@customElement('conduit-combo-box')
export class ComboBox extends LitElement {
  @property({ type: Array }) options: ComboBoxOption[] = [];
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: Boolean }) disabled = false;

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
      <div class="usa-combo-box">
        <select
          class="usa-select"
          name="combo-box"
          ?disabled=${this.disabled}
          @input=${this.handleInput}
        >
          <option value="">${this.placeholder}</option>
          ${this.options.map(option => html`
            <option value="${option.value}" ?selected=${this.value === option.value}>
              ${option.label}
            </option>
          `)}
        </select>
      </div>
    `;
  }
}