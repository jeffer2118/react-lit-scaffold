import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Footer.js';

interface FooterLink {
  text: string;
  href: string;
}

interface SocialLink extends FooterLink {
  icon: string;
}

@customElement('conduit-footer')
export class Footer extends LitElement {
  @property({ type: Array }) primaryLinks: FooterLink[] = [];
  @property({ type: Array }) secondaryLinks: FooterLink[] = [];
  @property({ type: Array }) socialLinks: SocialLink[] = [];
  @property({ type: String }) logo = '';
  @property({ type: String }) logoAlt = '';
  @property({ type: String }) heading = '';
  @property({ type: String }) returnToTop = 'Return to top';
  @property({ type: String }) signUpText = '';
  @property({ type: String }) signUpButtonText = 'Sign up';
  @property({ type: String }) agencyName = '';
  @property({ type: String }) contactCenter = '';
  @property({ type: String }) contactEmail = '';
  @property({ type: String }) contactPhone = '';

  private handleReturnToTop(e: Event) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private handleSignUp(e: Event) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('signup', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <footer class="usa-footer">
        ${this.returnToTop ? html`
          <div class="usa-footer__return-to-top">
            <a href="#" @click=${this.handleReturnToTop}>${this.returnToTop}</a>
          </div>
        ` : ''}

        <div class="usa-footer__primary-section">
          <div class="usa-footer__primary-container grid-row">
            <div class="mobile-lg:grid-col-8">
              <nav class="usa-footer__nav" aria-label="Footer navigation">
                <ul class="grid-row grid-gap">
                  ${this.primaryLinks.map(link => html`
                    <li class="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                      <a class="usa-footer__primary-link" href="${link.href}">${link.text}</a>
                    </li>
                  `)}
                </ul>
              </nav>
            </div>

            ${this.signUpText ? html`
              <div class="mobile-lg:grid-col-4">
                <div class="usa-sign-up">
                  <h3 class="usa-sign-up__heading">${this.signUpText}</h3>
                  <form class="usa-form" @submit=${this.handleSignUp}>
                    <button class="usa-button" type="submit">${this.signUpButtonText}</button>
                  </form>
                </div>
              </div>
            ` : ''}
          </div>
        </div>

        <div class="usa-footer__secondary-section">
          <div class="grid-container">
            <div class="grid-row grid-gap">
              <div class="usa-footer__logo grid-row mobile-lg:grid-col-6 mobile-lg:grid-gap-2">
                ${this.logo ? html`
                  <div class="mobile-lg:grid-col-auto">
                    <img class="usa-footer__logo-img" src="${this.logo}" alt="${this.logoAlt}"/>
                  </div>
                ` : ''}
                ${this.heading || this.agencyName ? html`
                  <div class="mobile-lg:grid-col-auto">
                    ${this.heading ? html`
                      <h3 class="usa-footer__logo-heading">${this.heading}</h3>
                    ` : ''}
                    ${this.agencyName ? html`
                      <p class="usa-footer__agency-name">${this.agencyName}</p>
                    ` : ''}
                  </div>
                ` : ''}
              </div>

              <div class="usa-footer__contact-links mobile-lg:grid-col-6">
                ${this.socialLinks.length > 0 ? html`
                  <div class="usa-footer__social-links grid-row grid-gap-1">
                    ${this.socialLinks.map(link => html`
                      <div class="grid-col-auto">
                        <a class="usa-social-link" href="${link.href}">
                          <svg class="usa-social-link__icon" aria-hidden="true" role="img">
                            <use xlink:href="/assets/img/sprite.svg#${link.icon}"></use>
                          </svg>
                          <span>${link.text}</span>
                        </a>
                      </div>
                    `)}
                  </div>
                ` : ''}

                ${this.contactCenter || this.contactEmail || this.contactPhone ? html`
                  <h3 class="usa-footer__contact-heading">${this.contactCenter}</h3>
                  ${this.contactEmail ? html`
                    <address class="usa-footer__address">
                      <div class="usa-footer__contact-info grid-row grid-gap">
                        <div class="grid-col-auto">
                          <a href="mailto:${this.contactEmail}">${this.contactEmail}</a>
                        </div>
                      </div>
                    </address>
                  ` : ''}
                  ${this.contactPhone ? html`
                    <div class="usa-footer__contact-info grid-row grid-gap">
                      <div class="grid-col-auto">
                        <a href="tel:${this.contactPhone}">${this.contactPhone}</a>
                      </div>
                    </div>
                  ` : ''}
                ` : ''}
              </div>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}