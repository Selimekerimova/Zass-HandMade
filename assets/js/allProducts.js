const cards = document.querySelector(".cards"),
  loadMoreBtn = document.querySelector(".loadMore");

let limit = 3;
let products;
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
    productName.innerHTML = `${element.productName}`;
    productPrice.innerHTML = `$${element.price}`;
    productOldPrice.innerHTML =`${element.oldPrice}`
    addToCardBtn.innerHTML = "Add to card";

    cardDiv.className = "card";
    cardInfoDiv.className = "info-card";
    pricesDiv.className = "productPrice";
    prosesDiv.className = "proses";
    productOldPrice.className = "oldPrice";
    addToCardBtn.className = "addToCardBtn";
    eyeIcon.className = "fa-solid fa-eye";
    favIcon.className = "fa-regular fa-heart";

    cardDiv.append(image, cardInfoDiv);
    cardInfoDiv.append(productName, pricesDiv, prosesDiv);
    pricesDiv.append(productPrice, productOldPrice);
    prosesDiv.append(addToCardBtn, favIcon, eyeIcon);
    cards.append(cardDiv);
  });
}

// load more
loadMoreBtn.addEventListener("click", function () {
  limit += 3;
  drawCard(products.slice(0, limit));
  if (limit >= products.length) {
    loadMoreBtn.remove();
  }
});
