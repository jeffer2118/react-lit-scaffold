import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/InPageNavigation.js';

interface NavItem {
  id: string;
  label: string;
}

@customElement('conduit-in-page-navigation')
export class InPageNavigation extends LitElement {
  @property({ type: Array }) items: NavItem[] = [];
  @property({ type: String }) activeId = '';
  @property({ type: Number }) offset = 0;

  private handleClick(id: string, e: Event) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: targetPosition - this.offset,
        behavior: 'smooth'
      });
      this.activeId = id;
      this.dispatchEvent(new CustomEvent('nav-change', {
        detail: { id },
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <nav class="usa-in-page-nav" aria-label="In-page navigation">
        <ul class="usa-in-page-nav__list">
          ${this.items.map(item => html`
            <li class="usa-in-page-nav__item">
              <a
                href="#${item.id}"
                class="usa-in-page-nav__link ${this.activeId === item.id ? 'usa-current' : ''}"
                @click=${(e: Event) => this.handleClick(item.id, e)}
              >
                ${item.label}
              </a>
            </li>
          `)}
        </ul>
      </nav>
    `;
  }
}