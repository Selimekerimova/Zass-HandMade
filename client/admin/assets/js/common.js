const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");
const switchMode = document.getElementById("switch-mode");
let body = document.querySelector("body");
allSideMenu.forEach((item) => {
    const li = item.parentElement;
  
    item.addEventListener("click", function () {
      allSideMenu.forEach((i) => {
        i.parentElement.classList.remove("active");
      });
      li.classList.add("active");
    });
  });


switchMode.addEventListener("change", function () {
  body.classList.toggle('dark');
  localStorage.setItem('mode',body.classList)
});
if (localStorage.getItem("mode") != "") {
  body.classList.add(localStorage.getItem("mode"));
}