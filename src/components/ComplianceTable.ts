import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface ComplianceRow {
  device: string;
  lastAudit: string;
  compliance: boolean;
}

@customElement('compliance-table')
export class ComplianceTable extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    th {
      color: #666;
      font-weight: 500;
    }
    .status {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 14px;
    }
    .status.compliant {
      background: #e6f4ea;
      color: #1e8e3e;
    }
    .status.non-compliant {
      background: #fce8e6;
      color: #d93025;
    }
  `;

  @property({ type: Array }) data: ComplianceRow[] = [];

  render() {
    return html`
      <table>
        <thead>
          <tr>
            <th>Device</th>
            <th>Most Recent Audit</th>
            <th>Compliance</th>
          </tr>
        </thead>
        <tbody>
          ${this.data.map(row => html`
            <tr>
              <td>${row.device}</td>
              <td>${row.lastAudit}</td>
              <td>
                <span class="status ${row.compliance ? 'compliant' : 'non-compliant'}">
                  ${row.compliance ? 'Yes' : 'No'}
                </span>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }
}