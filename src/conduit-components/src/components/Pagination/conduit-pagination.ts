import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Pagination.js';

@customElement('conduit-pagination')
export class Pagination extends LitElement {
  @property({ type: Number }) currentPage = 1;
  @property({ type: Number }) totalPages = 1;
  @property({ type: Boolean }) disabled = false;

  private handlePageChange(page: number) {
    if (this.disabled) return;
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.dispatchEvent(new CustomEvent('page-change', {
        detail: { page: this.currentPage },
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    const pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    
    return html`
      <style>
        ${style}
      </style>
      <nav class="usa-pagination" aria-label="Pagination">
        <ul class="usa-pagination__list">
          <li class="usa-pagination__item usa-pagination__arrow">
            <button
              class="usa-pagination__link usa-pagination__previous-page"
              aria-label="Previous page"
              ?disabled=${this.currentPage === 1 || this.disabled}
              @click=${() => this.handlePageChange(this.currentPage - 1)}
            >
              <span class="usa-pagination__link-text">Previous</span>
            </button>
          </li>
          ${pages.map(page => html`
            <li class="usa-pagination__item usa-pagination__page-no">
              <button
                class="usa-pagination__button ${page === this.currentPage ? 'usa-current' : ''}"
                aria-label="Page ${page}"
                aria-current=${page === this.currentPage ? 'page' : 'false'}
                ?disabled=${this.disabled}
                @click=${() => this.handlePageChange(page)}
              >
                ${page}
              </button>
            </li>
          `)}
          <li class="usa-pagination__item usa-pagination__arrow">
            <button
              class="usa-pagination__link usa-pagination__next-page"
              aria-label="Next page"
              ?disabled=${this.currentPage === this.totalPages || this.disabled}
              @click=${() => this.handlePageChange(this.currentPage + 1)}
            >
              <span class="usa-pagination__link-text">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    `;
  }
}