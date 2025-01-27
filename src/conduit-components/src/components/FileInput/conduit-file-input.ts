import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { styles as style } from './styles/FileInput.js';

@customElement('conduit-file-input')
export class FileInput extends LitElement {
  @property({ type: String }) accept = '';
  @property({ type: Boolean }) multiple = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) label = 'Select a file';
  @property({ type: String }) instructions = 'Drag file here or';
  @property({ type: String }) buttonText = 'Choose from folder';
  @property({ type: Array }) files: File[] = [];

  private handleFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      this.files = Array.from(input.files);
      this.dispatchEvent(new CustomEvent('file-select', {
        detail: { files: this.files },
        bubbles: true,
        composed: true
      }));
    }
  }

  private handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  private handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer?.files) {
      this.files = this.multiple 
        ? Array.from(e.dataTransfer.files)
        : [e.dataTransfer.files[0]];
      
      this.dispatchEvent(new CustomEvent('file-select', {
        detail: { files: this.files },
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <div class="usa-form-group">
        <label class="usa-label" for="file-input">
          ${this.label}
        </label>
        <div 
          class="usa-file-input"
          @dragover=${this.handleDragOver}
          @drop=${this.handleDrop}
        >
          <div class="usa-file-input__target">
            <div class="usa-file-input__instructions" aria-hidden="true">
              <span class="usa-file-input__drag-text">${this.instructions}</span>
              <span class="usa-file-input__choose">${this.buttonText}</span>
            </div>
            
            <div class="usa-file-input__box"></div>

            <input
              id="file-input"
              class="usa-file-input__input"
              type="file"
              accept="${this.accept}"
              ?multiple=${this.multiple}
              ?disabled=${this.disabled}
              @change=${this.handleFileSelect}
            />
          </div>

          ${this.files.length > 0 ? html`
            <div class="usa-file-input__preview-heading">
              Selected files:
              <span class="usa-file-input__choose">${this.files.length} files selected</span>
            </div>
            <div class="usa-file-input__preview">
              ${this.files.map(file => html`
                <div class="usa-file-input__preview-image">
                  <span class="usa-file-input__preview-name">${file.name}</span>
                </div>
              `)}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}