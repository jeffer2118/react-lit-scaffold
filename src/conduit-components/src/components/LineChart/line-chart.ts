import { LitElement, html, css } from 'lit';
import * as d3 from "d3";
import { property, customElement } from 'lit/decorators.js';

@customElement('line-chart')
class LineGraph extends LitElement {
  static styles = css`
    /* Add your component styles here */
  `;

  @property({ type: Array }) data: { value: number }[] = [
    { value: 100 },
    { value: 112 },
    { value: 153 },
    { value: 235 },
    { value: 330 },
    { value: 138 },
  ];

  render() {
    return html`
      <!-- Render the SVG container for the chart -->
      <h2>Line Graph</h2>
      <svg id="chart"></svg>
    `;
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('data')) {
      this.renderChart();
    }
  }

  renderChart() {
    // Extract data from the property
    const data = this.data;
    // Select the SVG element
    const svg = d3.select<SVGSVGElement, unknown>(this.shadowRoot!.getElementById('chart') as unknown as SVGSVGElement);
  
    if (!svg) return; // Return if SVG element is not found
  
    // Set the dimensions of the SVG container
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 400;
    const height = 200;
  
    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)!])
      .range([height, 0]);
  
    // Define the line function
    const line = d3.line<{value: number}>()
      .x((d, i) => xScale(i))
      .y(d => yScale(d.value));
  
    // Draw the line
    svg.selectAll('path').remove(); // Remove existing line
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);
  
    // Add x axis
    svg.selectAll('.x-axis').remove(); // Remove existing x axis
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
      .call(d3.axisBottom(xScale).ticks(data.length));
  
    // Add y axis
    svg.selectAll('.y-axis').remove(); // Remove existing y axis
    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale));
  }
}
