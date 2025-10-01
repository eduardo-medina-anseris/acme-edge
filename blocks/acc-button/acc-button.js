export default function decorate(a) {
  a.title = a.title || a.textContent;
  if (a.href !== a.textContent) {
    const up = a.parentElement;
    const twoup = a.parentElement.parentElement;
    if (!a.querySelector('img')) {
      if (up.childNodes.length === 1 && (up.tagName === 'P' || up.tagName === 'DIV')) {
        a.className = 'acc-button'; // default
        up.classList.add('acc-button-wrapper');
        up.classList.add('first');
      }

      if (
        up.childNodes.length === 1
        && up.tagName === 'STRONG'
        && twoup.childNodes.length === 1
        && twoup.tagName === 'P'
      ) {
        a.className = 'acc-button';
        twoup.classList.add('acc-button-wrapper');
        twoup.classList.add('second');
      }

      if (
        up.childNodes.length === 1
        && up.tagName === 'EM'
        && twoup.childNodes.length === 1
        && twoup.tagName === 'P'
      ) {
        a.className = 'acc-button';
        twoup.classList.add('acc-button-wrapper');
        twoup.classList.add('second');
      }
    }
  }
}
