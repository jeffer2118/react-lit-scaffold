import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/ButtonGroup.js';

@customElement('conduit-button-group')
export class ButtonGroup extends LitElement {
  @property({ type: Boolean }) segmented = false;

  render() {
    return html`
      <style>
        ${style}
      </style>
      <div class="usa-button-group ${this.segmented ? 'usa-button-group--segmented' : ''}">
        <slot></slot>
      </div>
    `;
  }
}