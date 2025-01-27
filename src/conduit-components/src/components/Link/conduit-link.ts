import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Link.js';

@customElement('conduit-link')
export class Link extends LitElement {
  @property({ type: String }) href = '';
  @property({ type: String }) variant: 'default' | 'primary' | 'secondary' = 'default';
  @property({ type: Boolean }) external = false;
  @property({ type: Boolean }) disabled = false;

  render() {
    const variantClass = this.variant !== 'default' ? `usa-link--${this.variant}` : '';
    const externalProps = this.external ? {
      target: '_blank',
      rel: 'noopener noreferrer'
    } : {};

    return html`
      <style>
        ${style}
      </style>
      <a
        class="usa-link ${variantClass}"
        href="${this.href}"
        ?disabled="${this.disabled}"
        aria-disabled="${this.disabled}"
        ...=${externalProps}
      >
        <slot></slot>
        ${this.external ? html`
          <svg class="usa-icon" aria-hidden="true" role="img">
            <use xlink:href="/assets/img/sprite.svg#launch"></use>
          </svg>
        ` : ''}
      </a>
    `;
  }
}