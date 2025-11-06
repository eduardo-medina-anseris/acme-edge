import {
  decorateBlock,
} from './aem.js';

function isCssSize(value) {
  const regex = /^-?\d+(\.\d+)?[a-zA-Z%]+$/;
  return regex.test(value.trim());
}

/**
 * Applies variant classes to elements based on following [[variant: ...]] markers.
 *
 * Expected pattern:
 * <p>Some content</p>
 * <p>[[variant: primary]]</p>
 *
 * This optimized version scans only text nodes instead of all DOM elements.
 *
 * @param {HTMLElement} main - The root element to scan for variant markers.
 */
export function decorateVariants(main) {
  if (!main) return;

  // Create a TreeWalker to efficiently iterate only text nodes
  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);

  const variantRegex = /^\s*\[\[variant:\s*([^\]]+)\]\]\s*$/;
  const toRemove = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const text = node.nodeValue.trim();
    const match = text.match(variantRegex);

    if (match) {
      const variantClass = match[1].trim();
      const parent = node.parentElement;

      // Apply to previous sibling element
      let prev = parent?.previousElementSibling;

      if (!prev && parent) {
        prev = parent.parentElement?.previousElementSibling;
      }

      if (prev) {
        prev.classList.add(variantClass);
        prev.dataset.variant = variantClass;
      }

      // Mark parent element for removal (we remove later to avoid messing traversal)
      if (parent) toRemove.push(parent);
    }
  }

  // Remove all marker elements after traversal
  toRemove.forEach((el) => el.remove());
}

export function decorateAccBlocks(main) {
  if (!main) return;

  const accRegex = /^\s*\[(acc-[^\]]+)\]\s*$/;

  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
  const blocksToProcess = [];

  // Recopilar todos los nodos de texto que indican un bloque
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const text = node.nodeValue.trim();
    const match = text.match(accRegex);

    if (match) {
      const accClass = match[1].trim();
      const p = node.parentElement;
      if (p && p.tagName.toLowerCase() === 'p') {
        blocksToProcess.push({ p, accClass });
      }
    }
  }

  blocksToProcess.forEach(({ p, accClass }) => {
    const parentEl = p.parentElement;
    if (!parentEl) return;

    const blockParent = parentEl.closest('div');
    if (!blockParent || [...blockParent.classList].some((cls) => cls.startsWith('acc-'))) return;

    const children = Array.from(blockParent.children);
    let blockPs = [];
    let currentAccClass = accClass;

    children.forEach((child, idx) => {
      if (child.tagName.toLowerCase() !== 'p') return;

      const text = child.textContent.trim();
      const match = text.match(accRegex);
      if (match) {
        // Crear bloque anterior si existe
        if (blockPs.length > 0) {
          const blockDiv = document.createElement('div');
          blockDiv.classList.add(currentAccClass);

          blockPs.forEach((pEl) => {
            const innerWrapper = document.createElement('div');
            const innerDiv = document.createElement('div');
            innerDiv.textContent = pEl.textContent;
            innerWrapper.appendChild(innerDiv);
            blockDiv.appendChild(innerWrapper);
          });

          blockParent.insertBefore(blockDiv, blockPs[0]);
          blockPs.forEach((pEl) => pEl.remove());

          // Llamar a decorateBlock sobre el bloque recién creado
          if (typeof decorateBlock === 'function') {
            decorateBlock(blockDiv);
          }
        }

        currentAccClass = match[1].trim();
        blockPs = [child];
      } else if (currentAccClass) {
        blockPs.push(child);
      }

      // Último <p> del contenedor
      if (idx === children.length - 1 && blockPs.length > 0) {
        const blockDiv = document.createElement('div');
        blockDiv.classList.add(currentAccClass);

        blockPs.forEach((pEl) => {
          const innerWrapper = document.createElement('div');
          const innerDiv = document.createElement('div');
          innerDiv.textContent = pEl.textContent;
          innerWrapper.appendChild(innerDiv);
          blockDiv.appendChild(innerWrapper);
        });

        blockParent.insertBefore(blockDiv, blockPs[0]);
        blockPs.forEach((pEl) => pEl.remove());

        // Llamar a decorateBlock sobre el bloque recién creado
        if (typeof decorateBlock === 'function') {
          decorateBlock(blockDiv);
        }
      }
    });
  });
}

export function decorateSeparators(main) {
  if (!main) return;

  // Create a TreeWalker to efficiently iterate only text nodes
  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);

  const separatorRegex = /^\s*\[\[separator:\s*(.+?)\s*\]\]\s*$/;
  const toRemove = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const text = node.nodeValue.trim();
    const match = text.match(separatorRegex);

    if (match) {
      const variantOrValue = match[1].trim();

      const parent = document.createElement('div');
      parent.classList.add('acc-separator-wrapper');

      const block = document.createElement('div');
      block.classList.add('acc-separator');

      if (isCssSize(variantOrValue)) {
        block.style.height = variantOrValue;
      } else {
        parent.classList.add(variantOrValue);
      }

      block.append(document.createElement('hr'));
      parent.append(block);

      const existingParent = node.parentElement;
      existingParent.before(parent);

      if (existingParent) toRemove.push(existingParent);
    }
  }

  // Remove all marker elements after traversal
  toRemove.forEach((el) => el.remove());
}

export function applyVariantAttributes(newElem, variantElem) {
  if (!newElem || !variantElem) return;

  newElem.classList.add(...variantElem.classList);

  Object.entries(variantElem.dataset).forEach(([key, value]) => {
    newElem.dataset[key] = value;
  });
}

export default decorateVariants;
