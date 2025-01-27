import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Icon.js';

@customElement('conduit-icon')
export class Icon extends LitElement {
  @property({ type: String }) name = '';
  @property({ type: String }) size = 'medium';
  @property({ type: String }) color = '';

  render() {
    const sizeClass = this.size !== 'medium' ? `usa-icon--size-${this.size}` : '';
    
    return html`
      <style>
        ${style}
        :host {
          color: ${this.color};
        }
      </style>
      <svg class="usa-icon ${sizeClass}" aria-hidden="true" focusable="false" role="img">
        <use xlink:href="/assets/img/sprite.svg#${this.name}"></use>
      </svg>
    `;
  }
}