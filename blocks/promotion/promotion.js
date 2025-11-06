export default function decorate(block) {
  // Create main hero wrapper
  const wrapper = document.createElement('div');
  wrapper.classList.add('hero-promotion-block');

  // Content wrapper
  const content = document.createElement('div');
  content.classList.add('hero-promotion-content');

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
  // block.innerHTML = '';
  // block.appendChild(wrapper);
}
