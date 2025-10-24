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
        const rootElem = editorElem.parentElement;
        const colorContainer = editorElem.lastElementChild;
        const extraClassText = colorContainer ? colorContainer.textContent.trim() : '';

        if (extraClassText) {
          rootElem.classList.add(extraClassText);
        }

        const classesToTransfer = Array.from(editorElem.classList);
        a.classList.add(...classesToTransfer);

        const dataBlockName = editorElem.getAttribute('data-block-name');
        const dataBlockStatus = editorElem.getAttribute('data-block-status');

        if (dataBlockName) {
          a.setAttribute('data-block-name', dataBlockName);
        }
        if (dataBlockStatus) {
          a.setAttribute('data-block-status', dataBlockStatus);
        }

        rootElem.innerHTML = '';
        rootElem.appendChild(a);
      }
    }
  }
}
