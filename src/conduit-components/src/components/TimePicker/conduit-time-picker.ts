import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/TimePicker.js';

@customElement('conduit-time-picker')
export class TimePicker extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: String }) min = '';
  @property({ type: String }) max = '';
  @property({ type: Number }) step = 15;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) label = '';
  @property({ type: Boolean }) required = false;

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
      <div class="usa-form-group">
        ${this.label ? html`
          <label class="usa-label" for="time-picker">
            ${this.label}
            ${this.required ? html`<span class="usa-label--required">required</span>` : ''}
          </label>
        ` : ''}
        <div class="usa-time-picker">
          <input
            class="usa-input"
            id="time-picker"
            type="time"
            name="time"
            .value="${this.value}"
            min="${this.min}"
            max="${this.max}"
            step="${this.step * 60}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            @input="${this.handleInput}"
          />
        </div>
      </div>
    `;
  }
}