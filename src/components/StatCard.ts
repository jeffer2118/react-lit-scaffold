import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('stat-card')
export class StatCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .title {
      font-size: 16px;
      color: #666;
      margin-bottom: 8px;
    }
    .value {
      font-size: 32px;
      font-weight: bold;
      color: #333;
    }
    .icon {
      float: right;
      color: #666;
    }
  `;

  @property({ type: String }) title = '';
  @property({ type: Number }) value = 0;
  @property({ type: String }) icon = '';

  render() {
    return html`
      <div>
        <span class="icon">${this.icon}</span>
        <div class="title">${this.title}</div>
        <div class="value">${this.value}</div>
      </div>
    `;
  }
}