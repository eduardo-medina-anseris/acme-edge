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
        const variantContainer = editorElem.lastElementChild;
        const extraClassText = variantContainer ? variantContainer.textContent.trim() : '';
        const anchorText = a.textContent.trim();

        if (extraClassText) {
          rootElem.classList.add(extraClassText);
        }

        // Ensure the <a> tag has the new desired class and preserved text
        a.className = 'acc-button-link';
        a.removeAttribute('data-block-name');
        a.removeAttribute('data-block-status');
        a.textContent = anchorText;

        // Force the correct data-block-status on editorElem to prevent "loaded" state
        editorElem.setAttribute('data-block-status', 'initialized');

        // Clean the editorElem (removes all the nested divs)
        editorElem.innerHTML = '';

        // Reinsert the clean <a> tag directly into the editorElem
        editorElem.appendChild(a);

        // Clean the rootElem and reinsert editorElem
        rootElem.innerHTML = '';
        rootElem.appendChild(editorElem);
      }
    }
  }
}
