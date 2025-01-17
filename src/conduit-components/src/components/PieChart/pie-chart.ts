import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

interface Slice {
  value: number;
  color: string;
}

@customElement('pie-chart')
export class PieChart extends LitElement {
  @property({ type: Array }) chartdata: Slice[] = [
    { value: 25, color: 'Coral' },
    { value: 115, color: 'CornflowerBlue' },
    { value: 62, color: '#00ab6b' },
  ];
  @property({ type: String }) dataurl = '';

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
        this.chartdata = data;
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    }
  }

  render() {
    let cumulativePercent = 0;
    const totalValue = this.chartdata.reduce((acc, slice) => acc + slice.value, 0);

    const paths = this.chartdata.map(slice => {
      const startPercent = cumulativePercent / totalValue;
      const endPercent = (cumulativePercent + slice.value) / totalValue;

      const [startX, startY] = this.getCoordinatesForPercent(startPercent);
      const [endX, endY] = this.getCoordinatesForPercent(endPercent);

      const largeArcFlag = slice.value / totalValue > 0.5 ? 1 : 0;

      cumulativePercent += slice.value;

      const pathData = [
        `M ${startX} ${startY}`,
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        'L 0 0',
      ].join(' ');

      return `<path d="${pathData}" fill="${slice.color}"></path>`;
    });

    const svgContent = `<svg viewBox="-1 -1 2 2" style="transform: rotate(-90deg)" xmlns="http://www.w3.org/2000/svg">${paths.join(
      ' ',
    )}</svg>`;

    return html`
      <style>
        /* Add your CSS styles here if necessary */
        svg {
          height: 200px;
        }
      </style>
      ${unsafeHTML(svgContent)}
    `;
  }

  private getCoordinatesForPercent(percent: number): [number, number] {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }
}
