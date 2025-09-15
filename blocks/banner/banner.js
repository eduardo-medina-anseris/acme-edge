export default function decorate(block) {
  const data = {};

  Array.from(block.children).forEach((childDiv) => {
    const children = Array.from(childDiv.children);
    if (children.length >= 2) {
      const key = children[0].textContent.trim().toLowerCase();
      const value = children[1].textContent.trim();
      data[key] = value;
    }
  });

  block.innerHTML = '';

  if (data.variation) {
    block.classList.add(`banner-lf-${data.variation}`);
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'banner-content';

  if (data.message) {
    const msg = document.createElement('div');
    msg.className = 'banner-message';
    msg.textContent = data.message;
    wrapper.appendChild(msg);
  }

  block.appendChild(wrapper);

  return data;
}
