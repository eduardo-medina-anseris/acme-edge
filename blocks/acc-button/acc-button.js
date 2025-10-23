import getVariants from './variants.js';

export default function decorate(a) {
  a.title = a.title || a.textContent;
  if (a.href !== a.textContent) {
    const up = a.parentElement;
    if (!a.querySelector('img')) {
      if (up.childNodes.length === 1 && (up.tagName === 'P' || up.tagName === 'DIV')) {
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
    }
  }
}
