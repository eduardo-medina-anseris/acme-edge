/**
 * Creates the alert body content
 * @param {string} message - Alert message content
 * @returns {HTMLElement} Alert body element
 */
function createAlertBody(message) {
  const body = document.createElement('div');
  body.className = 'banner-body';

  if (message) {
    body.innerHTML = message;
  }

  return body;
}

/**
 * Main decoration function for the alert block
 * @param {HTMLElement} block - The block element to decorate
 */
export default function decorate(block) {
  // Clear original content
  block.innerHTML = '';

  const banner = document.createElement('div');
  banner.className = 'banner-container';

  // Create alert body if message exists
  const body = createAlertBody('Test message');
  banner.appendChild(body);

  // Add to block
  block.appendChild(banner);
  block.className = `${block.className}`.trim();
}
