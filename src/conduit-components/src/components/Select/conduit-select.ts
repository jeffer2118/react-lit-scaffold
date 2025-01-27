import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Select.js';

interface SelectOption {
  value: string;
  label: string;
}

@customElement('conduit-select')
export class Select extends LitElement {
  @property({ type: Array }) options: SelectOption[] = [];
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = 'Select an option';
  @property({ type: Boolean }) disabled = false;

  private handleChange(e: Event) {
    const target = e.target as HTMLSelectElement;
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
      <select
        class="usa-select"
        ?disabled=${this.disabled}
        @change=${this.handleChange}
      >
        <option value="" ?selected=${!this.value}>${this.placeholder}</option>
        ${this.options.map(option => html`
          <option 
            value="${option.value}"
            ?selected=${this.value === option.value}
          >
            ${option.label}
          </option>
        `)}
      </select>
    `;
  }
}