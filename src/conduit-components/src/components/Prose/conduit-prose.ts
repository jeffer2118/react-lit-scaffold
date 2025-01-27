import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Prose.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('conduit-prose')
export class Prose extends LitElement {
  @property({ type: String }) content = '';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean }) measure = true;
  @property({ type: String }) align: 'left' | 'center' | 'right' = 'left';

  render() {
    const sizeClass = this.size !== 'medium' ? `usa-prose--${this.size}` : '';
    const measureClass = this.measure ? 'usa-prose--measure' : '';
    const alignClass = this.align !== 'left' ? `usa-prose--${this.align}` : '';

    return html`
      <style>
        ${style}
      </style>
      <div class="usa-prose ${sizeClass} ${measureClass} ${alignClass}">
        ${unsafeHTML(this.content)}
      </div>
    `;
  }
}