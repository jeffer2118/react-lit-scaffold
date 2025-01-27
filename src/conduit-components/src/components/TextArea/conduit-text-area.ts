import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/TextArea.js';

@customElement('conduit-text-area')
export class TextArea extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: Number }) rows = 4;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) label = '';
  @property({ type: Boolean }) required = false;

  private handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
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
          <label class="usa-label" for="textarea">
            ${this.label}
            ${this.required ? html`<span class="usa-label--required">required</span>` : ''}
          </label>
        ` : ''}
        <textarea
          class="usa-textarea"
          id="textarea"
          name="textarea"
          rows="${this.rows}"
          .value="${this.value}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          @input="${this.handleInput}"
        ></textarea>
      </div>
    `;
  }
}