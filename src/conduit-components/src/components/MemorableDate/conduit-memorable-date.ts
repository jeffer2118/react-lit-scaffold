import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/MemorableDate.js';

@customElement('conduit-memorable-date')
export class MemorableDate extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: String }) format: 'short' | 'medium' | 'long' = 'medium';
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) label = 'Date of birth';
  @property({ type: Boolean }) required = false;

  private day = '';
  private month = '';
  private year = '';

  firstUpdated() {
    if (this.value) {
      const date = new Date(this.value);
      this.day = date.getDate().toString();
      this.month = (date.getMonth() + 1).toString();
      this.year = date.getFullYear().toString();
    }
  }

  private handleInput(field: 'day' | 'month' | 'year', e: Event) {
    const target = e.target as HTMLInputElement;
    this[field] = target.value;

    if (this.day && this.month && this.year) {
      const date = new Date(
        parseInt(this.year),
        parseInt(this.month) - 1,
        parseInt(this.day)
      );
      
      if (date.toString() !== 'Invalid Date') {
        this.value = date.toISOString().split('T')[0];
        this.dispatchEvent(new CustomEvent('change', {
          detail: { value: this.value },
          bubbles: true,
          composed: true
        }));
      }
    }
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <fieldset class="usa-fieldset">
        <legend class="usa-legend">
          ${this.label}
          ${this.required ? html`<span class="usa-label--required">required</span>` : ''}
        </legend>
        <div class="usa-memorable-date">
          <div class="usa-form-group usa-form-group--day">
            <label class="usa-label" for="date-day">Day</label>
            <input
              class="usa-input"
              id="date-day"
              name="date-day"
              type="number"
              min="1"
              max="31"
              .value="${this.day}"
              ?disabled="${this.disabled}"
              ?required="${this.required}"
              @input="${(e: Event) => this.handleInput('day', e)}"
            />
          </div>
          <div class="usa-form-group usa-form-group--month">
            <label class="usa-label" for="date-month">Month</label>
            <input
              class="usa-input"
              id="date-month"
              name="date-month"
              type="number"
              min="1"
              max="12"
              .value="${this.month}"
              ?disabled="${this.disabled}"
              ?required="${this.required}"
              @input="${(e: Event) => this.handleInput('month', e)}"
            />
          </div>
          <div class="usa-form-group usa-form-group--year">
            <label class="usa-label" for="date-year">Year</label>
            <input
              class="usa-input"
              id="date-year"
              name="date-year"
              type="number"
              min="1900"
              max="2100"
              .value="${this.year}"
              ?disabled="${this.disabled}"
              ?required="${this.required}"
              @input="${(e: Event) => this.handleInput('year', e)}"
            />
          </div>
        </div>
      </fieldset>
    `;
  }
}