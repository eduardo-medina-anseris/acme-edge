export default function decorate(block) {
  const fields = {
    message: block.querySelector('[data-aue-prop="message"]')?.innerHTML || '',
    altern: block.querySelector('[data-aue-prop="altern"]')?.textContent.trim() || '',
    variation: block.querySelector('[data-aue-prop="bannerVariation"]')?.textContent.trim() || '',
  };

  block.innerHTML = '';

  if (fields.variation) {
    block.classList.add(`banner--${fields.variation}`);
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'banner-content';

  if (fields.message) {
    const msg = document.createElement('div');
    msg.className = 'banner-message';

    wrapper.appendChild(msg);
  }

  block.appendChild(wrapper);
}
