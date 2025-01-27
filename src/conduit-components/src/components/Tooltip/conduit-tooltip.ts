import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/Tooltip.js';

@customElement('conduit-tooltip')
export class Tooltip extends LitElement {
  @property({ type: String }) content = '';
  @property({ type: String }) position: 'top' | 'right' | 'bottom' | 'left' = 'top';
  @property({ type: String }) trigger: 'hover' | 'click' = 'hover';
  @property({ type: Boolean }) visible = false;

  private toggleTooltip() {
    if (this.trigger === 'click') {
      this.visible = !this.visible;
    }
  }

  private handleMouseEnter() {
    if (this.trigger === 'hover') {
      this.visible = true;
    }
  }

  private handleMouseLeave() {
    if (this.trigger === 'hover') {
      this.visible = false;
    }
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <div 
        class="usa-tooltip__trigger"
        @click="${this.toggleTooltip}"
        @mouseenter="${this.handleMouseEnter}"
        @mouseleave="${this.handleMouseLeave}"
      >
        <slot></slot>
        <span 
          class="usa-tooltip__body usa-tooltip__body--${this.position}"
          ?hidden="${!this.visible}"
          role="tooltip"
          aria-hidden="${!this.visible}"
        >
          ${this.content}
        </span>
      </div>
    `;
  }
}