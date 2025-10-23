import getVariants from './variants.js';

export default async function decorate(a) {
  if (!a) return;
  a.title ||= a.textContent;

  if (a.href !== a.textContent && !a.querySelector('img')) {
    const editorBlock = a.closest('[data-aue-model="acc-button"]');
    const wrapper = editorBlock || a.parentElement;
    let variant;

    if (editorBlock) {
      const variantEl = editorBlock.querySelector('[data-aue-prop="variant"]');
      variant = variantEl?.textContent.trim();
    } else {
      const next = wrapper.nextElementSibling;
      if (next?.textContent.includes('variant:')) {
        variant = next.textContent.replace(/.*variant:(\w+).*/, '$1').trim();
      }
    }

    if (wrapper.childNodes.length === 1 && (wrapper.tagName === 'P' || wrapper.tagName === 'DIV')) {
      a.className = 'acc-button';
      wrapper.classList.add('acc-button-wrapper');
      if (variant) wrapper.dataset.variant = variant;

      const variants = getVariants();
      const props = variants[variant];
      if (props?.typography) wrapper.classList.add(props.typography);
    }
  }
}
