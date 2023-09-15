function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function toggleMenu() {
  var desktopNav = document.getElementById('desktop-nav');

  if (desktopNav.classList.contains('show-nav')) {
    desktopNav.classList.remove('show-nav');
  } else {
    desktopNav.classList.add('show-nav');
  }
}

// Llama a la función cuando se hace clic en el icono del menú
document.querySelector('.hamburger-icon').addEventListener('click', toggleMenu);
