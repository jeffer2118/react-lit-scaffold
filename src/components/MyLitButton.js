import { LitElement, html, css } from 'lit';
import { createComponent } from '@lit/react';
import * as React from 'react';

export class MyLitButton extends LitElement {
  static properties = {
    label: { type: String },
    onClick: { type: Function }
  };

  static styles = css`
    button {
      background-color: #4CAF50;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #45a049;
    }
  `;

  render() {
    return html`
      <button @click=${this.onClick}>
        ${this.label}
      </button>
    `;
  }
}

customElements.define('my-lit-button', MyLitButton);

// Create the React component
export const MyButton = createComponent({
  tagName: 'my-lit-button',
  elementClass: MyLitButton,
  react: React,
  events: {
    onClick: 'click',
  },
});