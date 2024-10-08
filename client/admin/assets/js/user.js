// const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");
const form = document.querySelector(".form");
const addBtn = document.querySelector(".addBtn");
const errorText = document.querySelector(".error");
const tbody = document.querySelector("tbody");
const searchInput = document.querySelector(".search");
let data;
// let body = document.querySelector("body");

const BASE_URL = `https://zass-handmade-backend.onrender.com`;
// allSideMenu.forEach((item) => {
//   const li = item.parentElement;

//   item.addEventListener("click", function () {
//     allSideMenu.forEach((i) => {
//       i.parentElement.classList.remove("active");
//     });
//     li.classList.add("active");
//   });
// });

// TOGGLE SIDEBAR
// const menuBar = document.querySelector(".bx.bx-menu");
// const sidebar = document.getElementById("sidebar");

// menuBar.addEventListener("click", function () {
//   sidebar.classList.toggle("hide");
// });

// get all data
async function getAllData(endpoint) {
  try {
    let res = await axios(`${BASE_URL}/${endpoint}`);
    // console.log(res.data);
    data = res.data;
    drawTable(res.data);
  } catch (error) {
    console.log(error);
  }
}
getAllData("users");

// table
function drawTable(data) {
  tbody.innerHTML = "";
  data.forEach((item) => {
    // console.log(item);
    let tr = document.createElement("tr");
    let username = document.createElement("td");
    let email = document.createElement("td");
    let password = document.createElement("td");

    username.innerText = item.username;
    email.innerText = item.email;
    password.innerText = item.password;
    tr.append(username, email, password);
    tbody.append(tr);
  });
}

searchInput.addEventListener("input", function (e) {
  // console.log(e.target.value);
  let filtered = data.filter((item) =>
    item.username
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase())
  );
  drawTable(filtered);
});


// // dark mode
// const switchMode = document.getElementById("switch-mode");

// switchMode.addEventListener("change", function () {
//   body.classList.toggle('dark');
//   localStorage.setItem('mode',body.classList)
// });
// if (localStorage.getItem("mode") != "") {
//   body.classList.add(localStorage.getItem("mode"));
// }