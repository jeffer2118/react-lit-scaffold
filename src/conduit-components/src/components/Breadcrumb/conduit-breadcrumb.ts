import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Breadcrumb.js';

interface BreadcrumbItem {
  text: string;
  href: string;
}

@customElement('conduit-breadcrumb')
export class Breadcrumb extends LitElement {
  @property({ type: Array }) items: BreadcrumbItem[] = [];

  render() {
    return html`
      <style>
        ${style}
      </style>
      <nav class="usa-breadcrumb" aria-label="Breadcrumbs">
        <ol class="usa-breadcrumb__list">
          ${this.items.map((item, index) => html`
            <li class="usa-breadcrumb__list-item">
              ${index < this.items.length - 1 
                ? html`<a href="${item.href}" class="usa-breadcrumb__link">${item.text}</a>`
                : html`<span>${item.text}</span>`
              }
            </li>
          `)}
        </ol>
      </nav>
    `;
  }
}