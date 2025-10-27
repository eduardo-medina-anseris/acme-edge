import getVariants from './variants.js';

export default function decorate(block) {
  const blockSettings = {};

  const pairContainers = block.querySelectorAll(':scope > div');

  // 2. Iterar sobre cada contenedor para extraer la clave y el valor
  pairContainers.forEach(container => {
    const paragraphs = container.querySelectorAll('p');

    if (paragraphs.length >= 2) {
      const key = paragraphs[0].textContent.trim();
      const value = paragraphs[1].textContent.trim();

      blockSettings[key] = value;
    }
  });
  const hr = document.createElement('hr');

  if (blockSettings.separation) {
    hr.style.height = blockSettings.separation;
  }


  block.innerHTML = '';
  block.append(hr);

}
