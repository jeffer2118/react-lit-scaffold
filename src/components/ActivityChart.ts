import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface ActivityData {
  date: string;
  audits: number;
  remediations: number;
}

@customElement('activity-chart')
export class ActivityChart extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .chart-container {
      height: 200px;
      position: relative;
    }
    .bar {
      position: absolute;
      bottom: 0;
      width: 20px;
      transition: height 0.3s ease;
    }
    .bar.audits {
      background: #1a73e8;
    }
    .bar.remediations {
      background: #ea4335;
      margin-left: 24px;
    }
    .legend {
      display: flex;
      gap: 16px;
      margin-top: 16px;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }
  `;

  @property({ type: Array }) data: ActivityData[] = [];
  @property({ type: Number }) maxValue = 0;

  firstUpdated() {
    this.maxValue = Math.max(
      ...this.data.flatMap(d => [d.audits, d.remediations])
    );
  }

  render() {
    return html`
      <div class="chart-container">
        ${this.data.map((item, index) => html`
          <div class="bar-group" style="left: ${index * 60}px">
            <div 
              class="bar audits" 
              style="height: ${(item.audits / this.maxValue) * 100}%"
            ></div>
            <div 
              class="bar remediations" 
              style="height: ${(item.remediations / this.maxValue) * 100}%"
            ></div>
          </div>
        `)}
      </div>
      <div class="legend">
        <div class="legend-item">
          <div class="legend-color" style="background: #1a73e8"></div>
          <span>Audits</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background: #ea4335"></div>
          <span>Remediations</span>
        </div>
      </div>
    `;
  }
}