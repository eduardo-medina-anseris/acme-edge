import {
  applyVariantAttributes,
} from '../../scripts/theme-utils.js';

function apply(block, blockSettings) {
  const hr = document.createElement('hr');

  const newBlock = document.createElement('div');
  applyVariantAttributes(newBlock, block);

  if (blockSettings.separation) {
    block.style.height = blockSettings.separation;
  }

  const wrapperDiv = block.parentElement;

  // boilerplate code to be prepared for variant switch logic.
  if (!wrapperDiv.baseClasses) {
    wrapperDiv.baseClasses = Array.from(wrapperDiv.classList);
  }
  wrapperDiv.className = wrapperDiv.baseClasses.join(' ');

  if (blockSettings.variant && !newBlock.dataset.variant) {
    newBlock.dataset.variant = blockSettings.variant;
    wrapperDiv.classList.add(blockSettings.variant);
  }

  block.innerHTML = '';
  block.append(hr);
}

function decorateUniversalEditor(block) {
  const divContainers = block.querySelectorAll(':scope > div');
  const blockSettings = {};

  if (divContainers.length > 1) {
    blockSettings.separation = divContainers[1].innerText;
  }

  if (divContainers.length > 2) {
    blockSettings.variant = divContainers[2]?.innerText?.trim();
  }

  apply(block, blockSettings);
}

export default function decorate(block) {
  const blockWrapper = block.parentElement;

  if (blockWrapper.classList.contains('acc-separator-wrapper')
    && block.tagName === 'DIV') {
    decorateUniversalEditor(block);
    return;
  }
  const blockSettings = {};

  const pairContainers = block.querySelectorAll(':scope > div');

  pairContainers.forEach((container) => {
    const paragraphs = container.querySelectorAll('p');

    if (paragraphs.length >= 2) {
      const key = paragraphs[0].textContent.trim();
      const value = paragraphs[1].textContent.trim();
      blockSettings[key] = value;
    }
  });

  apply(block, blockSettings);
}
