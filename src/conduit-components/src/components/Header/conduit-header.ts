import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Header.js';

interface NavigationItem {
  text: string;
  href: string;
}

@customElement('conduit-header')
export class Header extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: String }) logo = '';
  @property({ type: Array }) navigation: NavigationItem[] = [];

  render() {
    return html`
      <style>
        ${style}
      </style>
      <header class="usa-header usa-header--basic">
        <div class="usa-nav-container">
          <div class="usa-navbar">
            ${this.logo ? html`
              <div class="usa-logo">
                <img src="${this.logo}" alt="${this.title} logo" />
              </div>
            ` : ''}
            <div class="usa-logo" id="basic-logo">
              <em class="usa-logo__text">${this.title}</em>
            </div>
          </div>
          <nav class="usa-nav">
            <ul class="usa-nav__primary usa-accordion">
              ${this.navigation.map(item => html`
                <li class="usa-nav__primary-item">
                  <a href="${item.href}" class="usa-nav__link">
                    ${item.text}
                  </a>
                </li>
              `)}
            </ul>
          </nav>
        </div>
      </header>
    `;
  }
}