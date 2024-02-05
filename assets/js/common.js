const header = document.querySelector("header"),
  nav = document.querySelector("nav"),
  menuIcon = document.querySelector(".fa-bars"),
  BASE_URL = `http://localhost:8080`;

menuIcon.addEventListener("click", function () {
  nav.classList.toggle("responsive-menu");
  menuIcon.classList.toggle("fa-xmark");
});


// scroll
window.addEventListener("scroll", function () {
  header.classList.toggle("scrollHeader", scrollY > 500);
});

