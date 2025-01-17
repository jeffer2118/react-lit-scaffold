import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/tables.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

interface TableRow {
  [key: string]: string | number;
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
          "Year": 1776
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

    return html`
      <style>
        ${style}
      </style>
      <div class="${this.scrollable ? 'usa-table-container--scrollable' : ''} ${this.stacked ? 'width-mobile' : ''}" tabindex="0">
        <table class="usa-table ${this.striped ? 'usa-table--striped' : ''} ${this.borderless ? 'usa-table--borderless' : ''} ${this.compact ? 'usa-table--compact' : ''} ${this.stacked ? 'usa-table--stacked-header' : ''}">
          ${captionText}
          <thead>
            <tr>
              ${Object.keys(tableRows[0]).map(key => html`<th>${key}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${tableRows.map((document: TableRow) => html`
              <tr>
                ${Object.values(document).map(value => html`<td>${unsafeHTML(String(value))}</td>`)}
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }
}
