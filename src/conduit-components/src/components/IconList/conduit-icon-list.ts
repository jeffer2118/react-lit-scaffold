import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/IconList.js';

interface IconListItem {
  icon: string;
  text: string;
  subtext?: string;
}

@customElement('conduit-icon-list')
export class IconList extends LitElement {
  @property({ type: Array }) items: IconListItem[] = [];
  @property({ type: String }) direction: 'horizontal' | 'vertical' = 'vertical';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';

  render() {
    const directionClass = `usa-icon-list--${this.direction}`;
    const sizeClass = this.size !== 'medium' ? `usa-icon-list--size-${this.size}` : '';

    return html`
      <style>
        ${style}
      </style>
      <ul class="usa-icon-list ${directionClass} ${sizeClass}">
        ${this.items.map(item => html`
          <li class="usa-icon-list__item">
            <div class="usa-icon-list__icon">
              <svg class="usa-icon" aria-hidden="true" role="img">
                <use xlink:href="/assets/img/sprite.svg#${item.icon}"></use>
              </svg>
            </div>
            <div class="usa-icon-list__content">
              <span>${item.text}</span>
              ${item.subtext ? html`
                <span class="usa-icon-list__subtext">${item.subtext}</span>
              ` : ''}
            </div>
          </li>
        `)}
      </ul>
    `;
  }
}