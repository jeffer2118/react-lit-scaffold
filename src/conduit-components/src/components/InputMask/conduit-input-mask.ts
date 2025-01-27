import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/InputMask.js';

@customElement('conduit-input-mask')
export class InputMask extends LitElement {
  @property({ type: String }) mask = '';
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: String }) label = '';
  @property({ type: String }) errorMessage = '';
  @property({ type: String }) type = 'text';
  @property({ type: String }) pattern = '';

  // Internal properties for mask handling
  private maskChars = {
    '9': /[0-9]/,
    'a': /[a-zA-Z]/,
    '*': /[a-zA-Z0-9]/
  };

  private previousValue = '';
  private cursorPosition = 0;

  private applyMask(value: string): string {
    if (!this.mask) return value;

    let maskedValue = '';
    let valueIndex = 0;

    for (let i = 0; i < this.mask.length && valueIndex < value.length; i++) {
      const maskChar = this.mask[i];
      const valueChar = value[valueIndex];

      if (maskChar in this.maskChars) {
        if (this.maskChars[maskChar as keyof typeof this.maskChars].test(valueChar)) {
          maskedValue += valueChar;
          valueIndex++;
        }
      } else {
        maskedValue += maskChar;
        if (valueChar === maskChar) {
          valueIndex++;
        }
      }
    }

    return maskedValue;
  }

  private handleInput(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    const newValue = input.value;
    
    // Store cursor position
    this.cursorPosition = input.selectionStart || 0;

    // Apply mask
    const maskedValue = this.applyMask(newValue.replace(/[^a-zA-Z0-9]/g, ''));
    
    // Update input value
    this.value = maskedValue;
    input.value = maskedValue;

    // Restore cursor position
    requestAnimationFrame(() => {
      input.selectionStart = this.cursorPosition;
      input.selectionEnd = this.cursorPosition;
    });

    this.dispatchEvent(new CustomEvent('input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private getInputPattern(): string {
    if (this.pattern) return this.pattern;

    // Convert mask to pattern
    return this.mask.replace(/9/g, '[0-9]')
                   .replace(/a/g, '[a-zA-Z]')
                   .replace(/\*/g, '[a-zA-Z0-9]');
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <div class="usa-form-group ${this.errorMessage ? 'usa-form-group--error' : ''}">
        ${this.label ? html`
          <label class="usa-label ${this.errorMessage ? 'usa-label--error' : ''}" for="masked-input">
            ${this.label}
            ${this.required ? html`<span class="usa-label--required">required</span>` : ''}
          </label>
        ` : ''}
        
        ${this.errorMessage ? html`
          <span class="usa-error-message" role="alert">${this.errorMessage}</span>
        ` : ''}

        <input
          class="usa-input ${this.errorMessage ? 'usa-input--error' : ''}"
          id="masked-input"
          type="${this.type}"
          .value="${this.value}"
          placeholder="${this.placeholder || this.mask}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          aria-required="${this.required}"
          aria-invalid="${Boolean(this.errorMessage)}"
          pattern="${this.getInputPattern()}"
          @input="${this.handleInput}"
        />
      </div>
    `;
  }
}