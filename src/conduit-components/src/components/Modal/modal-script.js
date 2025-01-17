export function enhanceModal(modalElement) {
  // Function to add event listeners to shadow DOM elements
  function setupShadowModal(shadowRoot) {
    const openModalButton = shadowRoot.querySelector('[data-open-modal]');
    const closeModalButtons = shadowRoot.querySelectorAll('[data-close-modal]');
    const modal = shadowRoot.querySelector('.usa-modal-wrapper');
    const overlay = shadowRoot.querySelector('.usa-modal-overlay');
    if (openModalButton && modal) {
      openModalButton.addEventListener('click', () => {
        modal.classList.add('is-visible');
      });
    }

    if (closeModalButtons && modal || overlay) {
      closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
          modal.classList.remove('is-visible');
        });
      });
    }
  }

  if (modalElement.shadowRoot) {
    setupShadowModal(modalElement.shadowRoot);
  } else {
    // If shadowRoot is not ready, wait for it to be ready
    modalElement.addEventListener('lit-element-updated', () => {
      setupShadowModal(modalElement.shadowRoot);
    });
  }
}
