import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Sidenav.js';

interface SidenavItem {
  id: string;
  label: string;
  icon?: string;
}

@customElement('conduit-sidenav')
export class Sidenav extends LitElement {
  @property({ type: Array }) items: SidenavItem[] = [];
  @property({ type: Boolean }) expanded = true;
  @property({ type: String }) activeItem = '';

  private handleItemClick(id: string) {
    this.activeItem = id;
    this.dispatchEvent(new CustomEvent('item-select', {
      detail: { id },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <nav class="usa-sidenav ${this.expanded ? 'is-expanded' : ''}">
        <ul class="usa-sidenav__list">
          ${this.items.map(item => html`
            <li class="usa-sidenav__item">
              <a
                href="#${item.id}"
                class="usa-sidenav__link ${this.activeItem === item.id ? 'usa-current' : ''}"
                @click=${(e: Event) => {
                  e.preventDefault();
                  this.handleItemClick(item.id);
                }}
              >
                ${item.icon ? html`
                  <span class="usa-sidenav__icon">
                    <svg class="usa-icon" aria-hidden="true" role="img">
                      <use xlink:href="/assets/img/sprite.svg#${item.icon}"></use>
                    </svg>
                  </span>
                ` : ''}
                ${item.label}
              </a>
            </li>
          `)}
        </ul>
      </nav>
    `;
  }
}