import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Banner.js';

@customElement('conduit-banner')
export class Banner extends LitElement {
  @property({ type: String }) type = 'info';
  @property({ type: String }) message = '';

  render() {
    return html`
      <style>
        ${style}
      </style>
      <div class="usa-banner ${this.type}">
        <div class="usa-banner__content">
          <div class="usa-banner__guidance">
            <slot>${this.message}</slot>
          </div>
        </div>
      </div>
    `;
  }
}