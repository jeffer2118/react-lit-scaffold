import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Search.js';

@customElement('conduit-search')
export class Search extends LitElement {
  @property({ type: String }) placeholder = 'Search';
  @property({ type: String }) value = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) autofocus = false;

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private handleSubmit(e: Event) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('search', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <form class="usa-search" role="search" @submit=${this.handleSubmit}>
        <label class="usa-sr-only" for="search-field">Search</label>
        <input
          class="usa-input"
          id="search-field"
          type="search"
          name="search"
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          ?autofocus=${this.autofocus}
          @input=${this.handleInput}
        />
        <button class="usa-button" type="submit" ?disabled=${this.disabled}>
          <span class="usa-search__submit-text">Search</span>
        </button>
      </form>
    `;
  }
}