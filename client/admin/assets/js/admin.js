const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");
const form = document.querySelector(".form");
const addBtn = document.querySelector(".addBtn");
const errorText = document.querySelector(".error");
const tbody = document.querySelector("tbody");
const productName = document.querySelector(".productName");
const price = document.querySelector(".price");
const oldPrice = document.querySelector(".oldPrice");
const description = document.querySelector(".desc");
const photo = document.querySelector(".photo");
const category = document.querySelector(".category");
let base64;
let id;
const BASE_URL = `http://localhost:8080`;
allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector(".bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

// get all data
async function getAllData(endpoint) {
  try {
    let res = await axios(`${BASE_URL}/${endpoint}`);
    // console.log(res.data);
    drawTable(res.data);
  } catch (error) {
    console.log(error);
  }
}
getAllData("products");

// table
function drawTable(data) {
  tbody.innerHTML = "";
  data.forEach((item) => {
    let tr = document.createElement("tr");
    let imgTd = document.createElement("td");
    let productName = document.createElement("td");
    let price = document.createElement("td");
    let oldPrice = document.createElement("td");
    let category = document.createElement("td");
    let process = document.createElement("td");
    let deleteBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    let img = document.createElement("img");

    img.src = item.img;
    productName.innerHTML = item.productName;
    price.innerHTML = item.price;
    oldPrice.innerHTML = item.oldPrice;
    category.innerHTML = item.category;
    deleteBtn.innerHTML = "Delete";
    editBtn.innerHTML = "Edit";

    deleteBtn.className = "delete";
    editBtn.className = "edit";
    oldPrice.className = "oldPrice";

    imgTd.append(img);
    process.append(deleteBtn, editBtn);
    tr.append(imgTd, productName, price, oldPrice, category, process);
    tbody.append(tr);

    // delete product
    deleteBtn.addEventListener("click", async function () {
      id = item._id;
      // console.log(id);
      if (confirm("Are You Sure??")) {
        axios.delete(`${BASE_URL}/products/${id}`);
        tr.remove();
      } else {
        console.log(error);
      }
    });

  
  });
}

// // post
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  let obj = {
    photo: base64,
    productName: productName.value,
    price: price.value,
    oldPrice: oldPrice.value,
    desc: description.value,
    category: category.value,
  };
  // console.log(obj);
  if (addBtn.innerText === "ADD") {
    try {
      if (productName.value && price.value && description.value) {
        // await axios.post(`${BASE_URL}/products`, obj);
        errorText.classList.remove("showError");

      } else {
        errorText.classList.add("showError");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("sad");
   
  }
});
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
