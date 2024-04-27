const cards = document.querySelector(".cards"),
  loadMoreBtn = document.querySelector(".loadMore");

let favCount = document.querySelector(".favCount");
let basketCount = document.querySelector(".basketCount");
let limit = 5;
let favProducts = getProductLocaleStorage();
let basketProduct = getToBasketProductLocaleStorage();
let products;
favoriteCount(favProducts.length);
async function getAllData(endpoint) {
  try {
    let res = await axios(`${BASE_URL}/${endpoint}`);
    // console.log(res.data);
    products = res.data;
    drawCard(res.data.slice(0, limit));
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
    productOldPrice.innerHTML = element.oldPrice ? `$${element.oldPrice}` : "";

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

      let product = products.find((item) => item._id == element._id);
      // let basketData = getToBasketProductLocaleStorage();
      let basketIndex = basketProduct?.findIndex(
        (item) => item.product._id == element._id
      );
      if (basketIndex > -1) {
        basketProduct[basketIndex].count = basketProduct[basketIndex].count + 1;
      } else {
        basketProduct.push({ count: 1, product: product });
      }
      console.log();
      setToBasketProductLocaleStorage(basketProduct);
      allBasketCount();
    });
  });
}

// load more
loadMoreBtn.addEventListener("click", function () {
  limit += 5;
  drawCard(products.slice(0, limit));
  if (limit >= products.length) {
    loadMoreBtn.remove();
  }
});

// settoBasketLocaleStorage
function setToBasketProductLocaleStorage(arr) {
  localStorage.setItem("basket", JSON.stringify(arr));
}

// setLocaleStorage
function setProductLocaleStorage(arr) {
  localStorage.setItem("fav", JSON.stringify(arr));
}
// getLocaleStorage
function getProductLocaleStorage() {
  return JSON.parse(localStorage.getItem("fav")) || [];
}
// gettoBasketLocaleStorage
function getToBasketProductLocaleStorage() {
  return JSON.parse(localStorage.getItem("basket")) || [];
}

// // fav count

function favoriteCount(count) {
  favCount.textContent = count;
}
favoriteCount(favProducts.length);
// // basket count
function allBasketCount() {
  basketCount.textContent = basketProduct.reduce(
    (acc, curr) => acc + curr.count,
    0
  );
}
allBasketCount();
