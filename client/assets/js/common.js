const header = document.querySelector("header"),
  nav = document.querySelector("nav"),
  menuIcon = document.querySelector(".fa-bars"),
  BASE_URL = `https://zass-handmade-backend.onrender.com`;

const loading = document.querySelector("#loading");
// loading
window.addEventListener("load", function () {
  loading.style.display = "none";
});
menuIcon.addEventListener("click", function () {
  nav.classList.toggle("responsive-menu");
  menuIcon.classList.toggle("fa-xmark");
});

// scroll
window.addEventListener("scroll", function () {
  header.classList.toggle("scrollHeader", scrollY > 300);
});
