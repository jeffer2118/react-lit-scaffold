import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/CharacterCount.js';

@customElement('conduit-character-count')
export class CharacterCount extends LitElement {
  @property({ type: Number }) maxlength = 0;
  @property({ type: String }) value = '';

  private updateCount(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
  }

  render() {
    const remaining = this.maxlength - this.value.length;
    const message = `${remaining} characters remaining`;

    return html`
      <style>
        ${style}
      </style>
      <div class="usa-character-count">
        <div class="usa-character-count__wrapper">
          <textarea
            class="usa-textarea usa-character-count__field"
            maxlength="${this.maxlength}"
            @input=${this.updateCount}
          >${this.value}</textarea>
          <span class="usa-character-count__message" aria-live="polite">
            ${message}
          </span>
        </div>
      </div>
    `;
  }
}