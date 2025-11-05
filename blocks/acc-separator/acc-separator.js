import {
  applyVariantAttributes,
} from '../../scripts/theme-utils.js';

export default function decorate(block) {
  const blockSettings = {};
  const expectedKeys = ['separation', 'variant']; // orden esperado si no hay keys

  const pairContainers = block.querySelectorAll(':scope > div');

  let hasKeys = false;

  pairContainers.forEach((container) => {
    const paragraphs = container.querySelectorAll('p');
    if (paragraphs.length >= 2) hasKeys = true;
  });

  pairContainers.forEach((container, index) => {
    const paragraphs = container.querySelectorAll('p');

    if (hasKeys && paragraphs.length >= 2) {
      const key = paragraphs[0].textContent.trim();
      const value = paragraphs[1].textContent.trim();
      blockSettings[key] = value;
    } else if (!hasKeys && paragraphs.length >= 1) {
      const value = paragraphs[0].textContent.trim();
      const key = expectedKeys[index] || `key${index}`;
      blockSettings[key] = value;

      if (key === 'separation') {
        blockSettings[key] = `${value}px`;
      } else {
        blockSettings[key] = value;
      }
    }
  });

  const hr = document.createElement('hr');

  const newBlock = document.createElement('div');
  applyVariantAttributes(newBlock, block);

  if (blockSettings.separation) {
    block.style.height = blockSettings.separation;
  }

  const wrapperDiv = block.parentElement;

  if (blockSettings.variant && !newBlock.dataset.variant) {
    newBlock.dataset.variant = blockSettings.variant;
    wrapperDiv.classList.add(blockSettings.variant);
  }

  block.innerHTML = '';
  block.append(hr);
}
