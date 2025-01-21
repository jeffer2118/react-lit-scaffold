import { LitElement, html } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { styles as style } from './styles/tables.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

interface TableRow {
  [key: string]: string | number | { [key: string]: any };
}

@customElement('conduit-table')
export class ConduitTable extends LitElement {
  @property({ type: String }) caption = '';
  @property({ type: Boolean }) striped = false;
  @property({ type: Boolean }) borderless = false;
  @property({ type: Boolean }) scrollable = false;
  @property({ type: Boolean }) compact = false;
  @property({ type: Boolean }) stacked = false;
  @property({ type: String }) dataurl = '';
  @property({ type: Array }) tableData: TableRow[] = [];
  
  @state() private expandedRows: Set<number> = new Set();

  async connectedCallback() {
    super.connectedCallback();
    if (this.dataurl !== '') {
      try {
        const response = await fetch(this.dataurl);
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${this.dataurl}. Status: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Fetched data is not in the expected format.');
        }
        this.tableData = data;
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    }
  }

  private toggleRow(index: number) {
    const newExpandedRows = new Set(this.expandedRows);
    if (newExpandedRows.has(index)) {
      newExpandedRows.delete(index);
    } else {
      newExpandedRows.add(index);
    }
    this.expandedRows = newExpandedRows;
    this.requestUpdate();
  }

  private renderExpandedContent(content: any) {
    if (typeof content === 'object') {
      return html`
        <div class="expanded-content">
          ${Object.entries(content).map(([key, value]) => html`
            <div class="expanded-row">
              <strong>${key}:</strong> 
              ${typeof value === 'object' 
                ? this.renderExpandedContent(value) 
                : html`<span>${value}</span>`}
            </div>
          `)}
        </div>
      `;
    }
    return html`<span>${content}</span>`;
  }

  render() {
    let captionText;
    let tableRows: TableRow[] = [];
    
    if (this.caption !== '') {
      captionText = html`<caption>${this.caption}</caption>`;
    }
    
    if (this.tableData.length > 0) {
      tableRows = this.tableData;
    } else {
      tableRows = [
        {
          "Document title": "Declaration of Independence",
          "Description": "<strong>Statement</strong> adopted by the Continental Congress declaring independence from the British Empire.",
          "Year": 1776,
          "Expanded": {
            "table": {
              "test": "test"
            },
          }
        },
        {
          "Document title": "Bill of Rights",
          "Description": "The first ten amendments of the U.S. Constitution guaranteeing rights and freedoms.",
          "Year": 1791
        },
        {
          "Document title": "Declaration of Sentiments",
          "Description": "A document written during the Seneca Falls Convention outlining the rights that American women should be entitled to as citizens.",
          "Year": 1848
        },
        {
          "Document title": "Emancipation Proclamation",
          "Description": "An executive order granting freedom to slaves in designated southern states.",
          "Year": 1863
        }
      ];
    }

    const visibleColumns = Object.keys(tableRows[0]).filter(key => key !== 'Expanded');

    return html`
      <style>
        ${style}
        .expandable {
          cursor: pointer;
        }
        .expandable:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        .expanded-content {
          padding: 1rem;
          background-color: #f8f9fa;
          border-top: 1px solid #dee2e6;
        }
        .expanded-row {
          padding: 0.5rem 0;
        }
        .expand-icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          margin-right: 8px;
          text-align: center;
          transition: transform 0.2s ease;
        }
        .expanded .expand-icon {
          transform: rotate(90deg);
        }
      </style>
      <div class="${this.scrollable ? 'usa-table-container--scrollable' : ''} ${this.stacked ? 'width-mobile' : ''}" tabindex="0">
        <table class="usa-table ${this.striped ? 'usa-table--striped' : ''} ${this.borderless ? 'usa-table--borderless' : ''} ${this.compact ? 'usa-table--compact' : ''} ${this.stacked ? 'usa-table--stacked-header' : ''}">
          ${captionText}
          <thead>
            <tr>
              ${visibleColumns.map(key => html`<th>${key}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${tableRows.map((document: TableRow, index: number) => html`
              <tr class="${document.Expanded ? 'expandable' : ''} ${this.expandedRows.has(index) ? 'expanded' : ''}"
                  @click="${document.Expanded ? () => this.toggleRow(index) : null}">
                ${visibleColumns.map(key => html`
                  <td>
                    ${key === Object.keys(document)[0] && document.Expanded
                      ? html`<span class="expand-icon">▶</span>`
                      : ''}
                    ${unsafeHTML(String(document[key]))}
                  </td>
                `)}
              </tr>
              ${document.Expanded && this.expandedRows.has(index)
                ? html`<tr>
                    <td colspan="${visibleColumns.length}">
                      ${this.renderExpandedContent(document.Expanded)}
                    </td>
                  </tr>`
                : ''}
            `)}
          </tbody>
        </table>
      </div>
    `;
  }
}