import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface OsData {
  name: string;
  count: number;
  color: string;
}

@customElement('os-distribution')
export class OsDistribution extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .os-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }
    .os-name {
      flex: 1;
    }
    .os-count {
      margin: 0 12px;
      font-weight: bold;
    }
    .progress-bar {
      height: 8px;
      background: #eee;
      border-radius: 4px;
      overflow: hidden;
      flex: 2;
    }
    .progress-fill {
      height: 100%;
      transition: width 0.3s ease;
    }
  `;

  @property({ type: Array }) data: OsData[] = [];
  @property({ type: Number }) total = 0;

  firstUpdated() {
    this.total = this.data.reduce((sum, item) => sum + item.count, 0);
  }

  render() {
    return html`
      <h3>Device(s) Operating System</h3>
      ${this.data.map(os => html`
        <div class="os-item">
          <span class="os-name">${os.name}</span>
          <span class="os-count">${os.count}</span>
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              style="
                width: ${(os.count / this.total) * 100}%;
                background-color: ${os.color}
              "
            ></div>
          </div>
        </div>
      `)}
    `;
  }
}