import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/RadioButtons.js';

interface RadioOption {
  value: string;
  label: string;
}

@customElement('conduit-radio-buttons')
export class RadioButtons extends LitElement {
  @property({ type: Array }) options: RadioOption[] = [];
  @property({ type: String }) name = '';
  @property({ type: String }) selected = '';
  @property({ type: Boolean }) disabled = false;

  private handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.selected = target.value;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.selected },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <fieldset class="usa-fieldset">
        ${this.options.map(option => html`
          <div class="usa-radio">
            <input
              class="usa-radio__input"
              id="${this.name}-${option.value}"
              type="radio"
              name="${this.name}"
              value="${option.value}"
              ?checked=${this.selected === option.value}
              ?disabled=${this.disabled}
              @change=${this.handleChange}
            />
            <label class="usa-radio__label" for="${this.name}-${option.value}">
              ${option.label}
            </label>
          </div>
        `)}
      </fieldset>
    `;
  }
}