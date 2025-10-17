/**
 * Applies variant classes to elements based on following [[variant: ...]] markers.
 *
 * Expected pattern:
 * <p>Some content</p>
 * <p>[[variant: primary]]</p>
 *
 * When found, the variant (e.g. "primary") is added as a class
 * to the previous sibling element, and the marker element is removed.
 *
 * @param {HTMLElement} main - The root element to scan for variant markers.
 */
export function decorateVariants(main) {
  if (!main) return;

  // Select all elements that are direct or deep descendants of `main`
  const elements = main.querySelectorAll('*');

  elements.forEach((el) => {
    const text = el.textContent.trim();
    const match = text.match(/^\[\[variant:\s*([^\]]+)\]\]$/);

    if (match) {
      const variantClass = match[1].trim();
      const prev = el.previousElementSibling;

      if (prev) {
        prev.classList.add(variantClass);
      }

      // Remove the marker element from DOM
      el.remove();
    }
  });
}

export default decorateVariants;
