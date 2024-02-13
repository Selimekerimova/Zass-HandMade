const cards = document.querySelector(".cards");
let basketProduct = getToBasketProductLocaleStorage();
let basketCount = document.querySelector(".basketCount");
const tbody = document.querySelector("tbody");

let products;
async function getAllData(endpoint) {
  try {
    let res = await axios(`${BASE_URL}/${endpoint}`);
    // console.log(res.data);
    products = res.data;
    // drawTable(res.data);
  } catch (error) {
    console.log(error);
  }
}
getAllData("products");
drawCard(basketProduct);
drawTable(basketProduct);
function drawCard(data) {
  cards.innerHTML = "";
  data.forEach((element) => {
    let cardDiv = document.createElement("div");
    let cardInfoDiv = document.createElement("div");
    let pricesDiv = document.createElement("div");
    let prosesDiv = document.createElement("div");
    let image = document.createElement("img");
    let productName = document.createElement("h2");
    let productPrice = document.createElement("p");
    let productOldPrice = document.createElement("p");
    let addToCardBtn = document.createElement("button");
    let eyeIcon = document.createElement("i");

    image.src = `${element.img}`;
    productName.innerHTML = `${element.productName.substring(0, 20)}...`;
    productPrice.innerHTML = `$${element.price}`;
    productOldPrice.innerHTML = `${element.oldPrice}`;
    addToCardBtn.innerHTML = "Add to card";

    cardDiv.className = "card";
    cardInfoDiv.className = "info-card";
    pricesDiv.className = "productPrice";
    prosesDiv.className = "proses";
    productOldPrice.className = "oldPrice";
    addToCardBtn.className = "addToCardBtn";
    eyeIcon.className = "fa-solid fa-eye";

    cardDiv.append(image, cardInfoDiv);
    cardInfoDiv.append(productName, pricesDiv, prosesDiv);
    pricesDiv.append(productPrice, productOldPrice);
    prosesDiv.append(addToCardBtn, eyeIcon);
    cards.append(cardDiv);

    // detail page
    eyeIcon.addEventListener("click", function () {
      window.location.href = `detail.html?id=${element._id}`;
    });

    // add to basket
    addToCardBtn.addEventListener("click", function () {
      console.log("clicked");
      let basketIndex = basketProduct.findIndex(
        (item) => item._id == element._id
      );
      if (basketIndex == -1) {
        basketProduct.push(element);
      } else {
        basketProduct.slice(basketIndex, 1);
      }
      setToBasketProductLocaleStorage(basketProduct);
      allBasketCount(basketProduct.length);
    });
  });
}

// table
function drawTable(data) {
  tbody.innerHTML = "";
  data.forEach((item) => {
    let tr = document.createElement("tr");
    let imgTd = document.createElement("td");
    let productName = document.createElement("td");
    let price = document.createElement("td");
    let totalPrice = document.createElement("td");
    // let category = document.createElement("td");
    let process = document.createElement("td");
    let deleteBtn = document.createElement("button");
    // let editBtn = document.createElement("button");
    let img = document.createElement("img");

    img.src = item.img;
    productName.innerHTML = item.productName;
    price.innerHTML = item.price;
    totalPrice.innerHTML = item.totalPrice;
    // category.innerHTML = item.category;
    deleteBtn.innerHTML = "Delete";
    // editBtn.innerHTML = "Edit";

    deleteBtn.className = "delete";
    // editBtn.className = "edit";
    totalPrice.className = "totalPrice";

    imgTd.append(img);
    process.append(deleteBtn);
    tr.append(imgTd, productName, price, totalPrice, process);
    tbody.append(tr);

    // delete product
    deleteBtn.addEventListener("click", async function () {
      basketProduct = basketProduct.filter(
        (element) => element._id != item._id
      );
      setToBasketProductLocaleStorage(basketProduct);
      allBasketCount(basketProduct.length);
      tr.remove();
    });
  });
}

// settoBasketLocaleStorage
function setToBasketProductLocaleStorage(arr) {
  localStorage.setItem("basket", JSON.stringify(arr));
}

// gettoBasketLocaleStorage
function getToBasketProductLocaleStorage() {
  return JSON.parse(localStorage.getItem("basket")) || [];
}

// // basket count
function allBasketCount(count) {
  basketCount.textContent = count;
}
allBasketCount(basketProduct.length);
