export default function decorate(block) {
  // Create main hero wrapper
  const wrapper = document.createElement('div');
  wrapper.classList.add('hero-promotion-block');

  // Content wrapper
  const content = document.createElement('div');
  content.classList.add('hero-promotion-content');

  // TEXTS: take everything from first div, skipping the first <p> (image)
  const textContainer = block.querySelector(':scope > div:nth-child(1) > div');
  if (textContainer) {
    const textWrapper = document.createElement('div');
    textWrapper.classList.add('hero-promotion-text');

    let skipFirstP = true;
    textContainer.childNodes.forEach((node) => {
      if (skipFirstP && node.tagName === 'P' && node.querySelector('picture')) {
        skipFirstP = false; // skip only the first <p> with picture
        return;
      }
      textWrapper.appendChild(node.cloneNode(true));
    });

    content.appendChild(textWrapper);
  }

  // BUTTONS: take everything from second div
  const buttonsContainer = block.querySelector(':scope > div:nth-child(2) > div');
  if (buttonsContainer) {
    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add('hero-promotion-buttons');

    buttonsContainer.childNodes.forEach((node) => {
      buttonsWrapper.appendChild(node.cloneNode(true)); // preserve markup
    });

    content.appendChild(buttonsWrapper);
  }

  wrapper.appendChild(content);

  // BACKGROUND IMAGE: take the first <img> inside <picture> in first <p>
  const img = block.querySelector(':scope > div:nth-child(1) p picture img');
  if (img) {
    wrapper.style.backgroundImage = `
      linear-gradient(176.98deg, rgba(0, 0, 0, 0.6) 7.49%, rgba(0, 0, 0, 0) 95.15%),
      url('${img.src}')
    `;
    wrapper.style.backgroundSize = 'cover';
    wrapper.style.backgroundPosition = 'center';
  }

  // Clear original block and insert new layout
  block.innerHTML = '';
  block.appendChild(wrapper);
}
