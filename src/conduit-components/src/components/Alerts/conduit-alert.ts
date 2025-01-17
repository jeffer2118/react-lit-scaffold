import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Alert.js';

@customElement('conduit-alert')
export class Alert extends LitElement {
  @property({ type: String }) alertformat = 'info';

  @property({ type: String }) slimformat = '';

  @property({ type: String }) icon = '';


  render() {
    let alertType;
    let alertSize = '';
    let alertIcon = '';
    switch (this.alertformat) {
      case 'info':
        alertType = 'usa-alert--info';
        break;
      case 'warn':
        alertType = 'usa-alert--warning';
        break;
      case 'success':
        alertType = 'usa-alert--success';
        break;
      case 'error':
        alertType = 'usa-alert--error';
        break;
      case 'emergency':
        alertType = 'usa-alert--emergency';
        break;
      default:
        alertType = '';
    }

    if (this.slimformat === 'slim') {
      alertSize = ' usa-alert--slim';
    }

    if (this.icon === 'no-icon') {
      alertIcon = ' usa-alert--no-icon';
    }

    return html`
      <style>
        ${style}
      </style>
      <div class="usa-alert ${alertType} ${alertSize} ${alertIcon}">
        <div class="usa-alert__body">
          <h4 class="usa-alert__heading"><slot name="alert-banner-title"></slot></h4>
          <p class="usa-alert__text">
            <slot name="alert-banner-description"></slot>
          </p>
        </div>
      </div>
    `;
  }
}
