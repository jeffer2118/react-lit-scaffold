import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/List.js';

@customElement('conduit-list')
export class List extends LitElement {
  @property({ type: Array }) items: string[] = [];
  @property({ type: String }) type: 'unordered' | 'ordered' = 'unordered';
  @property({ type: String }) variant: 'default' | 'compact' | 'bordered' = 'default';

  render() {
    const listClass = `usa-list ${this.variant !== 'default' ? `usa-list--${this.variant}` : ''}`;
    const ListTag = this.type === 'ordered' ? 'ol' : 'ul';

    return html`
      <style>
        ${style}
      </style>
      <${ListTag} class="${listClass}">
        ${this.items.map(item => html`<li>${item}</li>`)}
      </${ListTag}>
    `;
  }
}