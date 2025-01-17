import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Modals.js';
import { enhanceModal } from './modal-script.js';
import { sanitizeString } from '../../global/utils';

@customElement('usa-modal')
export class Modal extends LitElement {
  @property({ type: String }) buttontitle = 'Open default modal';
  @property({ type: String }) modaltitle = 'Are you sure you want to continues';
  @property({ type: String }) modaldescription = 'You have unsaved changes that will be lost.';
  @property({ type: String }) modalactionbutton = 'Save';
  @property({ type: String }) modalcancelbutton = 'Go back';
  @property({ type: String }) modalname = 'example modal';
  
  firstUpdated() {
    enhanceModal(this);
  }

  render() {
    let labels = sanitizeString(this.modalname);
    return html`
      <style>${style}</style>
      <div class="margin-y-3">
        <a
          href="#${labels}"
          class="usa-button"
          aria-controls="${labels}"
          data-open-modal
          >${this.buttontitle}</a
        >
        <div class="usa-modal-wrapper" role="dialog" id="${labels}" aria-labelledby="${labels}-heading" aria-describedby="${labels}-description" data-opener="modal-350000">
          <div class="usa-modal-overlay" aria-controls="${labels}">
            <div class="usa-modal" tabindex="-1">
              <div class="usa-modal__content">
                <div class="usa-modal__main">
                  <h2 class="usa-modal__heading" id="${labels}-heading"><a id="${sanitizeString(this.modaltitle)}" class="usa-anchor"></a>
                   ${this.modaltitle}
                  </h2>
                  <div class="usa-prose">
                    <p id="${labels}-description">
                      ${this.modaldescription}
                    </p>
                  </div>
                  <div class="usa-modal__footer">
                    <ul class="usa-button-group">
                      <li class="usa-button-group__item">
                        <button type="button" class="usa-button">
                          ${this.modalactionbutton}
                        </button>
                      </li>
                      <li class="usa-button-group__item">
                        <button type="button" class="usa-button usa-button--unstyled padding-105 text-center" data-close-modal="">
                          ${this.modalcancelbutton}
                        </button>
                      </li>
                    </ul>
                </div>
              </div>
              <button type="button" class="usa-button usa-modal__close" aria-label="Close this window" data-close-modal="">
                <svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
                  <use xlink:href="/assets/img/sprite.svg#close"></use>
                </svg>
              </button>
            </div>
          </div>
          <div class="usa-modal__bg__close" data-close-modal=""></div>
        </div>
      </div>
    `;
  }
}
