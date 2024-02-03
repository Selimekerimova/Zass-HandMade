const cards = document.querySelector(".cards"),
  loadMoreBtn = document.querySelector(".loadMore"),
  BASE_URL = `http://localhost:8080`;

//  Initialize Swiper
var swiper = new Swiper(".mySwiper", {
  cssMode: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  mousewheel: true,
  keyboard: true,
});

// get data
async function getAllData(endpoint) {
  try {
    let res = await axios(`${BASE_URL}/${endpoint}`);
    // console.log(res.data);
    drawCard(res.data)
  } catch (error) {
    console.log(error);
  }
}
getAllData("products");

// drawCard
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
    productName.innerHTML=`${element.productName}`
    productPrice.innerHTML=`${element.price}`
    productOldPrice.innerHTML=`${element.oldPrice}`

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
