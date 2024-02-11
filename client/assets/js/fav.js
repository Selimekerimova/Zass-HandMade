const cards = document.querySelector(".cards");
let favCount = document.querySelector(".favCount");



let favProducts = getProductLocaleStorage();
favoriteCount(favProducts.length);


drawCard(favProducts);
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
    favIcon.className = "fa-solid fa-heart";

    cardDiv.append(image, cardInfoDiv);
    cardInfoDiv.append(productName, pricesDiv, prosesDiv);
    pricesDiv.append(productPrice, productOldPrice);
    prosesDiv.append(addToCardBtn, favIcon, eyeIcon);
    cards.append(cardDiv);

    // add to fav

    favIcon.addEventListener("click", function () {
      favProducts = favProducts.filter((item) => item._id != element._id);
      setProductLocaleStorage(favProducts);
      favoriteCount(favProducts.length);
      cardDiv.remove();
    });
  });
}

// setLocaleStorage
function setProductLocaleStorage(arr) {
  localStorage.setItem("fav", JSON.stringify(arr));
}

// getLocaleStorage
function getProductLocaleStorage() {
  return JSON.parse(localStorage.getItem("fav")) || [];
}

// fav count

function favoriteCount(count) {
  favCount.textContent = count;
}
