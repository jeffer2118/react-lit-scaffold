import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/DonutChart.js';

@customElement('donut-chart')
export class DoughnutChart extends LitElement {
  @property({ type: Number }) percentageNum = 50;
  @property({ type: String }) linecolor = 'black';
  @property({ type: String }) textmiddle = this.percentageNum + '%';
  @property({ type: String }) strokeends = '';
  @property({ type: String }) bgstroke = '';

//   @property({ type: Boolean }) ariadisabled = false; // Change to boolean type

  render() {
    let strokeEnd = false;
    switch (this.strokeends) {
        case 'rounded':
            strokeEnd = true;
            break;
        default:
            strokeEnd = false;
    }
    let bgStroke = '';
    switch (this.bgstroke) {
        case '':
            bgStroke = 'transparent';
            break;
        default:
            bgStroke = this.bgstroke;
    }

    return html`
        <style>
            ${style}
            
            .results-circle {
                stroke:${this.linecolor};
            }
            .bg-circle {
                stroke: ${bgStroke};
            }
            @keyframes draw {
                to {
                    stroke-dashoffset: ${100 - this.percentageNum};
                }
            }
            
        </style>
      
        <svg 
            width="300" 
            height="300" 
            viewBox="-100 -100 200 200"
        >
            <circle 
                    r="75"
                    pathlength="100"
                    fill="transparent"
                    stroke-dasharray="100"
                    stroke-dashoffset="100"
                    stroke-width="30"
                    class="bg-circle"
            />
            <circle 
                r="75"
                pathlength="100"
                fill="transparent"
                stroke-dasharray="100"
                stroke-dashoffset="100"
                stroke-width="30"
                class="results-circle ${strokeEnd ? 'rounded' : ''}"
            />
            <text>${this.textmiddle}</text>
        </svg>
    `;
  }
}
