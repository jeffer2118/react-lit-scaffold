import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/DateRangePicker.js';

@customElement('conduit-date-range-picker')
export class DateRangePicker extends LitElement {
  @property({ type: String }) startDate = '';
  @property({ type: String }) endDate = '';
  @property({ type: String }) min = '';
  @property({ type: String }) max = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) startLabel = 'Start date';
  @property({ type: String }) endLabel = 'End date';

  private handleStartDateChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.startDate = target.value;
    this.dispatchEvent(new CustomEvent('start-date-change', {
      detail: { date: this.startDate },
      bubbles: true,
      composed: true
    }));
  }

  private handleEndDateChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.endDate = target.value;
    this.dispatchEvent(new CustomEvent('end-date-change', {
      detail: { date: this.endDate },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <div class="usa-date-range-picker">
        <div class="usa-form-group">
          <label class="usa-label" for="start-date">${this.startLabel}</label>
          <div class="usa-date-picker">
            <input
              class="usa-input"
              id="start-date"
              type="date"
              name="start-date"
              value="${this.startDate}"
              min="${this.min}"
              max="${this.max || this.endDate}"
              ?disabled="${this.disabled}"
              @input="${this.handleStartDateChange}"
            />
          </div>
        </div>

        <div class="usa-form-group">
          <label class="usa-label" for="end-date">${this.endLabel}</label>
          <div class="usa-date-picker">
            <input
              class="usa-input"
              id="end-date"
              type="date"
              name="end-date"
              value="${this.endDate}"
              min="${this.startDate || this.min}"
              max="${this.max}"
              ?disabled="${this.disabled}"
              @input="${this.handleEndDateChange}"
            />
          </div>
        </div>
      </div>
    `;
  }
}