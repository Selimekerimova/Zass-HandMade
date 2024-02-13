const cards = document.querySelector(".cards");
const swiperBtn = document.querySelectorAll(".detailBtn");
const scrollBtn = document.querySelector(".scrollBtn");

// aos
AOS.init();
//  Initialize Swiper
var swiper = new Swiper(".mySwiper", {
  cssMode: true,
  loop: true,
  autoplay: true,
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

// scroll btn
window.addEventListener("scroll", function () {
  scrollBtn.classList.toggle("scrollBtnShow", scrollY > 400);
});
scrollBtn.addEventListener("click", function () {
  window.scrollTo(0, 0);
});
// all product btn
swiperBtn.forEach((item) =>
  item.addEventListener("click", function () {
    window.location.href = "signup-login.html";
  })
);
// // scroll reveral
ScrollReveal().reveal(".hero-banner", { delay: 1000 });
// get data
async function getAllData(endpoint) {
  try {
    let res = await axios(`${BASE_URL}/${endpoint}`);
    // console.log(res.data);
    drawCard(res.data);
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
    let leftDiv = document.createElement("div");
    let rightDiv = document.createElement("div");
    let pricesDiv = document.createElement("div");
    let image = document.createElement("img");
    let productName = document.createElement("div");
    let productPrice = document.createElement("p");
    let productOldPrice = document.createElement("p");
    let productDescriptionDiv = document.createElement("div");
    let productDescription = document.createElement("p");
    let detailBtn = document.createElement("button");

    image.src = `${element.img}`;
    productName.innerHTML = `${element.productName}`;
    productPrice.innerHTML = `$${element.price}  - - - -`;
    productOldPrice.innerHTML =
      `$${element.oldPrice}` || `$${element.oldPrice}`;
    productDescription.innerHTML = `${element.description.substring(
      0,
      300
    )}....`;
    detailBtn.innerHTML = "Detail page";

    cardDiv.className = "swiper-slide";
    leftDiv.className = "left";
    rightDiv.className = "right";
    detailBtn.className = "detailBtn";
    pricesDiv.className = "products-price";
    productName.className = "title";
    productOldPrice.className = "oldPrice";
    productDescriptionDiv.className = "text";

    cardDiv.append(leftDiv, rightDiv);
    leftDiv.append(productName, pricesDiv, productDescriptionDiv, detailBtn);
    pricesDiv.append(productPrice, productOldPrice);
    productDescriptionDiv.append(productDescription);
    rightDiv.append(image);
    cards.append(cardDiv);

    // detail page
    detailBtn.addEventListener("click", function () {
      productId = element._id;
      console.log(productId);
      if (productId === element._id) {
        window.location.href = `detail.html?id=${productId}`;
      }
    });
  });
}
