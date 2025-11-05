export default function decorate(block) {
  block.classList.add('promotion-block');

  const items = block.querySelectorAll(':scope > .promotion-item');

  items.forEach((item) => {
    item.classList.add('promotion-item');

    // Aplicar fondo si se define
    const bgClass = item.dataset.backgroundClass;
    if (bgClass) item.classList.add(bgClass);

    // Comportamiento collapsable
    const collapsible = item.dataset.collapsible === 'true';
    const content = item.querySelector(':scope > .promotion-content');
    if (collapsible && content) {
      content.style.display = 'none';
      const toggle = document.createElement('div');
      toggle.classList.add('promotion-toggle');
      toggle.textContent = 'Mostrar / Ocultar';
      toggle.addEventListener('click', () => {
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
      });
      item.prepend(toggle);
    }
  });
}
