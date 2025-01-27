import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Collection.js';

interface CollectionItem {
  title: string;
  description: string;
}

@customElement('conduit-collection')
export class Collection extends LitElement {
  @property({ type: Array }) items: CollectionItem[] = [];
  @property({ type: Number }) columns = 3;

  render() {
    return html`
      <style>
        ${style}
      </style>
      <ul class="usa-collection" data-columns="${this.columns}">
        ${this.items.map(item => html`
          <li class="usa-collection__item">
            <div class="usa-collection__body">
              <h3 class="usa-collection__heading">
                ${item.title}
              </h3>
              <p class="usa-collection__description">
                ${item.description}
              </p>
            </div>
          </li>
        `)}
      </ul>
    `;
  }
}