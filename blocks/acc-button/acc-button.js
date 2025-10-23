import getVariants from './variants.js';

export default async function decorate(a) {
  if (!a) return;
  a.title ||= a.textContent;

  // Only process links that are not identical to their text and do not contain images
  if (a.href !== a.textContent && !a.querySelector('img')) {
    const editorBlock = a.closest('[data-aue-model="acc-button"]');
    let wrapper = a.parentElement;
    let variant;

    if (editorBlock) {
      // Extract variant from Universal Editor block
      const variantEl = editorBlock.querySelector('[data-aue-prop="variant"]');
      variant = variantEl?.textContent.trim();

      // Replace editor block with a clean <p> wrapper
      if (editorBlock !== wrapper) {
        wrapper = document.createElement('p');
        wrapper.appendChild(a);
        editorBlock.replaceWith(wrapper);
      }
    } else {
      // Check for [[variant:xxx]] in next sibling for Word-style input
      const next = wrapper.nextElementSibling;
      if (next?.textContent.includes('variant:')) {
        variant = next.textContent.replace(/.*variant:(\w+).*/, '$1').trim();
      }
    }

    // Only convert links to buttons if they are alone in a P or DIV
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
