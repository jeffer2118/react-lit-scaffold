import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Card.js';

/**
 * A LitElement-based Card component that supports various USWDS card layouts:
 *   - Default
 *   - Flag (`usa-card--flag`)
 *   - Media (`usa-card--media`)
 *   - Accented (`usa-card--accented`)
 *   - Border (`usa-card--border`)
 *
 * Usage examples:
 *   <conduit-card
 *     heading="My Card"
 *     subheading="A short description"
 *     bodyContent="This is a sample card."
 *     variant="flag"
 *     imageUrl="https://via.placeholder.com/400"
 *     altText="Example placeholder"
 *   >
 *     <div slot="footer">
 *       <a class="usa-button" href="#">Learn More</a>
 *     </div>
 *   </conduit-card>
 */
@customElement('conduit-card')
export class ConduitCard extends LitElement {
  /**
   * Main heading displayed in the card header.
   */
  @property({ type: String }) heading = '';

  /**
   * Optional subheading or secondary text.
   */
  @property({ type: String }) subheading = '';

  /**
   * URL of the image to display in the card.
   */
  @property({ type: String }) imageUrl = '';

  /**
   * Alternate text for the image (for accessibility).
   */
  @property({ type: String }) altText = '';

  /**
   * Main body content for the card.
   */
  @property({ type: String }) bodyContent = '';

  /**
   * Type/variant of card layout: `default`, `flag`, `media`, `accented`, or `border`.
   */
  @property({ type: String }) variant:
    | 'default'
    | 'flag'
    | 'media'
    | 'accented'
    | 'border' = 'default';

  /**
   * A helper method to combine the main `.usa-card` class
   * with any variant-specific modifier classes.
   */
  private getCardClasses(base = 'usa-card'): string {
    const classes = [base];

    // Layout variants (flag, media)
    if (this.variant === 'flag') {
      classes.push('usa-card--flag');
    } else if (this.variant === 'media') {
      classes.push('usa-card--media');
    }

    // Style variants (accented, border)
    if (this.variant === 'accented') {
      classes.push('usa-card--accented');
    } else if (this.variant === 'border') {
      classes.push('usa-card--border');
    }

    return classes.join(' ');
  }

  /**
   * Renders the card’s header.
   */
  private renderHeader() {
    return html`
      <h2>${this.heading}</h2>
      ${this.subheading
        ? html`<p class="usa-card__subheading">${this.subheading}</p>`
        : ''}
    `;
  }

  /**
   * Renders a “default” style card, with the header first, optional image in `.usa-card__media`, etc.
   */
  private renderDefaultCard() {
    return html`
      <article class="${this.getCardClasses()}">
        <header class="usa-card__header">
          ${this.renderHeader()}
        </header>

        ${this.imageUrl
          ? html`
              <div class="usa-card__media">
                <img src="${this.imageUrl}" alt="${this.altText}" />
              </div>
            `
          : ''}

        <div class="usa-card__body">
          <p>${this.bodyContent}</p>
        </div>

        <div class="usa-card__footer">
          <slot name="footer"></slot>
        </div>
      </article>
    `;
  }

  /**
   * Renders a “flag” style card, which positions the image and text side-by-side
   * using `.usa-card--flag` and `.usa-card__img`.
   */
  private renderFlagCard() {
    return html`
      <article class="${this.getCardClasses()}">
        <!-- Image first, side by side -->
        ${this.imageUrl
          ? html`
              <div class="usa-card__img">
                <img src="${this.imageUrl}" alt="${this.altText}" />
              </div>
            `
          : ''}

        <div class="usa-card__body">
          <header class="usa-card__header">
            ${this.renderHeader()}
          </header>

          <p>${this.bodyContent}</p>

          <div class="usa-card__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </article>
    `;
  }

  /**
   * Renders a “media” style card, in which the header is placed above the image,
   * and the image is in `.usa-card__img` between the header and body.
   */
  private renderMediaCard() {
    return html`
      <article class="${this.getCardClasses()}">
        <header class="usa-card__header">
          ${this.renderHeader()}
        </header>

        ${this.imageUrl
          ? html`
              <div class="usa-card__img">
                <img src="${this.imageUrl}" alt="${this.altText}" />
              </div>
            `
          : ''}

        <div class="usa-card__body">
          <p>${this.bodyContent}</p>
        </div>

        <div class="usa-card__footer">
          <slot name="footer"></slot>
        </div>
      </article>
    `;
  }

  render() {
    // Dynamically choose which template to render based on `variant`.
    let cardTemplate;
    switch (this.variant) {
      case 'flag':
        cardTemplate = this.renderFlagCard();
        break;
      case 'media':
        cardTemplate = this.renderMediaCard();
        break;
      case 'default':
      case 'accented':
      case 'border':
      default:
        // “accented” and “border” still share the default layout,
        // they just add different modifier classes.
        cardTemplate = this.renderDefaultCard();
        break;
    }

    return html`
      <style>
        ${style}
      </style>
      <div class="usa-card__container">
        ${cardTemplate}
      </div>
    `;
  }
}
