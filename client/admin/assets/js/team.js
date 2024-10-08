// const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");
const form = document.querySelector(".form");
const addBtn = document.querySelector(".addBtn");
const errorText = document.querySelector(".error");
const tbody = document.querySelector("tbody");
const photo = document.querySelector(".photo");
const fullname = document.querySelector(".fullname");
let searchInput = document.querySelector(".search");
// let body = document.querySelector("body");
let base64;
let editElem;
let id;
let data;

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

// // TOGGLE SIDEBAR
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
getAllData("team");

// table
function drawTable(data) {
  tbody.innerHTML = "";
  data.forEach((item) => {
    let tr = document.createElement("tr");
    let imgTd = document.createElement("td");
    let fullname = document.createElement("td");
    let process = document.createElement("td");

    let deleteBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    let img = document.createElement("img");

    img.src = item.img;
    fullname.innerHTML = item.fullname;

    deleteBtn.innerHTML = "Delete";
    editBtn.innerHTML = "Edit";

    deleteBtn.className = "delete";
    editBtn.className = "edit";

    imgTd.append(img);
    process.append(deleteBtn, editBtn);
    tr.append(imgTd, fullname, process);
    tbody.append(tr);

    // delete product
    deleteBtn.addEventListener("click", async function () {
      id = item._id;
      // console.log(id);
      if (confirm("Are You Sure??")) {
        axios.delete(`${BASE_URL}/team/${id}`);
        tr.remove();
      } else {
        console.log(error);
      }
    });

    editBtn.addEventListener("click", function () {
      id = item._id;
      editElem = item;
      addBtn.textContent = "Edit";
      // console.log(editElem);
      editProduct();
    });
  });
}

// // post
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  let obj = {
    fullname: fullname.value,
    img: photo.value,
  };


  // console.log(obj);
  if (addBtn.textContent.toLocaleLowerCase() === "add") {
    try {
      if (fullname.value) {
        errorText.classList.remove("showError");
      } else {
        errorText.classList.add("showError");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    await axios.patch(`${BASE_URL}/team/${id}`, obj);
    addBtn.innerText = "Add";
  }

  fullname.innerHTML = "";
});

// edit function

function editProduct() {
  // photo.value = editElem.img;
  fullname.value = editElem.fullname;
}

// base 64
photo.addEventListener("change", async function (e) {
  uploadImage(e);
});

const uploadImage = async (e) => {
  const file = e.target.files[0];
  base64 = await convertBase64(file);
};

const convertBase64 = async (file) => {
  return new Promise((reselve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      reselve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

searchInput.addEventListener("input", function (e) {
  // console.log(e.target.value);
  let filtered = data.filter((item) =>
    item.fullname
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase())
  );
  drawTable(filtered);
});


// dark mode
// const switchMode = document.getElementById("switch-mode");

// switchMode.addEventListener("change", function () {
//   body.classList.toggle('dark');
//   localStorage.setItem('mode',body.classList)
// });
// if (localStorage.getItem("mode") != "") {
//   body.classList.add(localStorage.getItem("mode"));
// }