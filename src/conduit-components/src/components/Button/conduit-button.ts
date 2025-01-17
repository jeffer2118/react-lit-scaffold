import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Button.js';

@customElement('conduit-button')
export class Button extends LitElement {
  @property({ type: String }) buttonformat = 'primary';
  @property({ type: Boolean }) ariadisabled = false; // Change to boolean type

  render() {
    let buttonType = '';
    switch (this.buttonformat) {
      case 'secondary':
        buttonType = 'usa-button--outline';
        break;
      case 'accentcool':
        buttonType = 'usa-button--accent-cool';
        break;
      case 'accentwarm':
        buttonType = 'usa-button--accent-warm';
        break;
      case 'secondaryinverse':
        buttonType = 'usa-button--inverse';
        break;
      case 'base':
        buttonType = 'usa-button--base';
        break;
      case 'warning':
        buttonType = 'usa-button--secondary';
        break;
      case 'unstyled':
        buttonType = 'usa-button--unstyled';
        break;
      default:
        buttonType = '';
    }

    return html`
      <style>
        ${style}
      </style>
      <button type="button" class="usa-button ${buttonType}" ?disabled="${this.ariadisabled}"><slot></slot></button>
    `;
  }
}
