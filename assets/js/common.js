const header = document.querySelector("header"),
  nav = document.querySelector("nav"),
  liElem = document.querySelectorAll("li"),
  menuIcon = document.querySelector(".fa-bars");

menuIcon.addEventListener("click", function () {
  nav.classList.toggle("responsive-menu");
  menuIcon.classList.toggle("fa-xmark");
});

// active class

liElem.forEach((item) => {
  item.addEventListener("click", function () {
    document.querySelector(".active").classList.remove("active");
    this.classList.add("active");
  });
});

// scroll
window.addEventListener("scroll", function () {
  header.classList.toggle("scrollHeader", scrollY > 500);
  console.log(scrollY);
});
