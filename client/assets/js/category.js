let cards = document.querySelector(".cards");
let categoryLinkElem = document.querySelectorAll(".category");
let id = new URLSearchParams(window.location.search).get("id");
let favCount = document.querySelector(".favCount");
let basketCount = document.querySelector(".basketCount");
let limit = 5;
let favProducts = getProductLocaleStorage();
let basketProduct = getToBasketProductLocaleStorage();
// console.log(id);
// let filtered;
// let data;
// get data
async function getAllData(endpoint) {
  try {
    let res = await axios(`${BASE_URL}/${endpoint}`);
    // console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}
getAllData("products");

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
    let favIcon = document.createElement("i");

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

    favIcon.className = favProducts.find((item) => item._id == element._id)
      ? "fa-solid fa-heart"
      : "fa-regular fa-heart";

    cardDiv.append(image, cardInfoDiv);
    cardInfoDiv.append(productName, pricesDiv, prosesDiv);
    pricesDiv.append(productPrice, productOldPrice);
    prosesDiv.append(addToCardBtn, favIcon, eyeIcon);
    cards.append(cardDiv);

    // detail page
    eyeIcon.addEventListener("click", function () {
      window.location.href = `detail.html?id=${element._id}`;
    });

    // add to fav

    favIcon.addEventListener("click", function () {
      this.className === "fa-regular fa-heart"
        ? (this.className = "fa-solid fa-heart")
        : (this.className = "fa-regular fa-heart");

      let favProduct = getProductLocaleStorage();

      let favIndex = favProduct.findIndex((item) => item._id == element._id);

      if (favIndex === -1) {
        favProduct.push(element);
      } else {
        favProduct.splice(favIndex, 1);
      }
      setProductLocaleStorage(favProduct);
      favoriteCount(favProduct.length);
    });

    // add to basket
    addToCardBtn.addEventListener("click", function () {
      // console.log("clicked");
      let basketData = getToBasketProductLocaleStorage();
      let basketIndex = basketData.findIndex((item) => item._id == element._id);
      if (basketIndex == -1) {
        basketData.push(element);
      } else {
        basketData.slice(basketIndex, 1);
      }
      setToBasketProductLocaleStorage(basketData);
      allBasketCount(basketData.length);
    });
  });
}

// category
async function sortProduct(endpoint) {
  let filtered;
  let res = await axios(`${BASE_URL}/${endpoint}`);
  if (id == "baby") {
    filtered = res.data.filter((item) => item.category == "baby");
    drawCard(filtered);
    // console.log(filtered);
  } else if (id == "art") {
    filtered = res.data.filter((item) => item.category == "art");
    drawCard(filtered);
  } else if (id == "home") {
    filtered = res.data.filter((item) => item.category == "home");
    drawCard(filtered);
  }
}
sortProduct("products");
// setLocaleStorage
function setProductLocaleStorage(arr) {
  localStorage.setItem("fav", JSON.stringify(arr));
}
// settoBasketLocaleStorage
function setToBasketProductLocaleStorage(arr) {
  localStorage.setItem("basket", JSON.stringify(arr));
}

// getLocaleStorage
function getProductLocaleStorage() {
  return JSON.parse(localStorage.getItem("fav")) || [];
}
// gettoBasketLocaleStorage
function getToBasketProductLocaleStorage() {
  return JSON.parse(localStorage.getItem("basket")) || [];
}

// // // fav count

function favoriteCount(count) {
  favCount.textContent = count;
}
favoriteCount(favProducts.length);
// // basket count
function allBasketCount(number) {
  basketCount.textContent = number;
}
allBasketCount(basketProduct.length);
