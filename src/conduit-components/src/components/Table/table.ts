import { LitElement, html, TemplateResult } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { styles as style } from './styles/tables.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

interface TableRow {
  [key: string]: string | number | { [key: string]: any };
}

interface NestedTable {
  type: string;
  title: string;
  data: TableRow[];
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

  async connectedCallback(): Promise<void> {
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

  private toggleRow(index: number): void {
    const newExpandedRows = new Set(this.expandedRows);
    if (newExpandedRows.has(index)) {
      newExpandedRows.delete(index);
    } else {
      newExpandedRows.add(index);
    }
    this.expandedRows = newExpandedRows;
    this.requestUpdate();
  }

  // Arrow function with explicit return type
  private renderNestedTable = (tableData: NestedTable): TemplateResult => {
    const visibleColumns = Object.keys(tableData.data[0]);

    return html`
      <div class="nested-table">
        <h3 class="nested-table-title">${tableData.title}</h3>
        <table class="usa-table 
          ${this.striped ? 'usa-table--striped' : ''} 
          ${this.borderless ? 'usa-table--borderless' : ''} 
          ${this.compact ? 'usa-table--compact' : ''}">
          <thead>
            <tr>
              ${visibleColumns.map(key => html`<th>${key}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${tableData.data.map((row: TableRow) => html`
              <tr>
                ${visibleColumns.map(key => html`
                  <td>${String(row[key])}</td>
                `)}
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  };

  // Arrow function with explicit return type and recursion
  private renderExpandedContent = (content: any): TemplateResult => {
    if (Array.isArray(content)) {
      return html`
        <div class="expanded-content">
          ${content.map(item => {
            if (item.type === 'table') {
              // Calls renderNestedTable
              return this.renderNestedTable(item);
            }
            // Recursively calls itself
            return this.renderExpandedContent(item);
          })}
        </div>
      `;
    }

    if (typeof content === 'object' && content !== null) {
      return html`
        <div class="expanded-content">
          ${Object.entries(content).map(([key, value]) => html`
            <div class="expanded-row">
              <strong>${key}:</strong>
              ${typeof value === 'object'
                ? this.renderExpandedContent(value)  // recursion
                : html`<span>${value}</span>`
              }
            </div>
          `)}
        </div>
      `;
    }

    // Base case for non-object values
    return html`<span>${content}</span>`;
  };

  render(): TemplateResult {
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
          "Expanded": [
            {
              type: "table",
              title: "Signers",
              data: [
                {"Name": "John Adams", "State": "Massachusetts"},
                {"Name": "Benjamin Franklin", "State": "Pennsylvania"},
                {"Name": "Thomas Jefferson", "State": "Virginia"},
                {"Name": "John Hancock", "State": "Massachusetts"},
                {"Name": "Samuel Adams", "State": "Massachusetts"},
                {"Name": "John Witherspoon", "State": "New Jersey"},
                {"Name": "Roger Sherman", "State": "Connecticut"},
                {"Name": "Richard Henry Lee", "State": "Virginia"}
              ]
            },
            {
              type: "table",
              title: "Key Events",
              data: [
                {"Event": "First Continental Congress", "Year": 1774},
                {"Event": "Second Continental Congress", "Year": 1775},
                {"Event": "Adoption of the Declaration of Independence", "Year": 1776},
                {"Event": "Treaty of Paris (end of the Revolutionary War)", "Year": 1783}
              ],
            }
          ]
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
          "Year": 1863,
          "Expanded": {
            "table2": {
              "test2": "test2"
            },
          }
        }
      ];
    }

    // Exclude the 'Expanded' property from the main columns
    const visibleColumns = Object.keys(tableRows[0]).filter(key => key !== 'Expanded');

    return html`
      <style>
        ${style}
        
      </style>
      <div 
        class="${this.scrollable ? 'usa-table-container--scrollable' : ''} 
               ${this.stacked ? 'width-mobile' : ''}" 
        tabindex="0"
      >
        <table class="usa-table 
          ${this.striped ? 'usa-table--striped' : ''} 
          ${this.borderless ? 'usa-table--borderless' : ''} 
          ${this.compact ? 'usa-table--compact' : ''} 
          ${this.stacked ? 'usa-table--stacked-header' : ''}"
        >
          ${captionText}
          <thead>
            <tr>
              ${visibleColumns.map(key => html`<th>${key}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${tableRows.map((document: TableRow, index: number) => html`
              <tr 
                class="${document.Expanded ? 'expandable' : ''} 
                       ${this.expandedRows.has(index) ? 'expanded' : ''}"
                @click="${document.Expanded ? () => this.toggleRow(index) : null}"
              >
                ${visibleColumns.map(key => html`
                  <td>
                    ${key === Object.keys(document)[0] && document.Expanded
                      ? html`<span class="expand-icon">▶</span>`
                      : ''
                    }
                    ${unsafeHTML(String(document[key]))}
                  </td>
                `)}
              </tr>
              ${document.Expanded && this.expandedRows.has(index)
                ? html`
                  <tr>
                    <td colspan="${visibleColumns.length}">
                      ${this.renderExpandedContent(document.Expanded)}
                    </td>
                  </tr>
                  `
                : ''
              }
            `)}
          </tbody>
        </table>
      </div>
    `;
  }
}
