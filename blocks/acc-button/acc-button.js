import getVariants from './variants.js';

export default function decorate(a) {
  if (a.nodeName !== 'A') return;
  a.title = a.title || a.textContent;

  if (a.href !== a.textContent) {
    if (!a.querySelector('img')) {
      const up = a.parentElement;
      const editorElem = a.closest('.acc-button');

      if (up.childNodes.length === 1 && !editorElem) { // Case for Word
        a.className = 'acc-button'; // default
        up.classList.add('acc-button-wrapper');
        const variants = getVariants();
        const cmpVariant = up.dataset.variant;
        if (cmpVariant) {
          const variantProperties = variants[cmpVariant];
          if (variantProperties) {
            up.classList.add(variantProperties.typography);
          }
        }
      }

      if (up.childNodes.length === 1 && editorElem) { // Case for Universal editor
        const originalRootElem = editorElem.parentElement;
        const variantContainer = editorElem.lastElementChild;
        const extraClassText = variantContainer ? variantContainer.textContent.trim() : '';

        const newWrapper = document.createElement('div');
        newWrapper.classList.add('default-content-wrapper');

        const classesToTransfer = Array.from(editorElem.classList).filter((c) => c !== 'acc-button');
        originalRootElem.classList.add(...classesToTransfer);

        if (extraClassText) {
          originalRootElem.classList.add(extraClassText);
        }

        const dataBlockName = editorElem.getAttribute('data-block-name');
        const dataBlockStatus = editorElem.getAttribute('data-block-status');

        if (dataBlockName) {
          originalRootElem.setAttribute('data-block-name', dataBlockName);
        }
        if (dataBlockStatus) {
          originalRootElem.setAttribute('data-block-status', dataBlockStatus);
        }

        a.className = 'acc-button';
        a.removeAttribute('data-block-name');
        a.removeAttribute('data-block-status');

        originalRootElem.innerHTML = '';
        originalRootElem.appendChild(a);

        if (originalRootElem.parentElement) {
          originalRootElem.parentElement.replaceChild(newWrapper, originalRootElem);
        }

        newWrapper.appendChild(originalRootElem);
      }
    }
  }
}
