export default function decorate(block) {
  block.textContent = '';
  const elem = document.createElement('div');
  elem.innerHTML = 'Hola soy el banner';
  block.append(elem);
}
