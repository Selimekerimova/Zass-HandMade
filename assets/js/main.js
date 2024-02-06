const cards = document.querySelector(".cards"),
  allProductBtn = document.querySelector(".allProductBtn");
 
let limit=3;
let products;
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
// // scroll reveral
ScrollReveal().reveal(".swiper-content", { delay: 2000});
// get data
async function getAllData(endpoint) {
  try {
    let res = await axios(`${BASE_URL}/${endpoint}`);
    // console.log(res.data);
    products=res.data
    drawCard(res.data.splice(0,limit))
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
    productName.innerHTML=`${element.productName.substring(0,20)}...`
    productPrice.innerHTML=`${element.price}`
    productOldPrice.innerHTML=`${element.oldPrice}`
    addToCardBtn.innerHTML="Add to card"

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


// all product 
allProductBtn.addEventListener("click",function(){
window.location.href="signup-login.html"
})

// fav 
