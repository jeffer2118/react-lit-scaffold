import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/ProcessList.js';

interface ProcessStep {
  title: string;
  description: string;
}

@customElement('conduit-process-list')
export class ProcessList extends LitElement {
  @property({ type: Array }) steps: ProcessStep[] = [];
  @property({ type: Number }) currentStep = 1;

  render() {
    return html`
      <style>
        ${style}
      </style>
      <ol class="usa-process-list">
        ${this.steps.map((step, index) => html`
          <li class="usa-process-list__item ${index + 1 <= this.currentStep ? 'usa-process-list__item--complete' : ''}">
            <h4 class="usa-process-list__heading">${step.title}</h4>
            <p class="usa-process-list__description">
              ${step.description}
            </p>
          </li>
        `)}
      </ol>
    `;
  }
}