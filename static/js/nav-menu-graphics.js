const url = new URL(window.location.href);

console.log(url);
var graphics = document.querySelector('.nav-menu-graphics');

if (url.pathname.includes('graphics')) {
  graphics.classList.toggle('is-active');
}
