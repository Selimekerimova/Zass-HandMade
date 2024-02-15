const cards = document.querySelector(".cards");
const swiperBtn = document.querySelectorAll(".detailBtn");
const scrollBtn = document.querySelector(".scrollBtn");
const toysCategory = document.querySelector(".toysCount");
const artCategory = document.querySelector(".artCount");
const homeCategory = document.querySelector(".homeCount");
const number = document.querySelectorAll(".count-number");
let categoryLinkElem = document.querySelectorAll(".category");
let teamCards = document.querySelector(".team-cards");

let interval = 5000;
let product;
let productId;

number.forEach((num) => {
  let startValue = 0;
  let endValue = parseInt(num.getAttribute("data-to"));
  let duration = Math.floor(interval / endValue);
  let counter = setInterval(function () {
    startValue += 1;
    num.textContent = startValue;
    if (startValue == endValue) {
      clearInterval(counter);
    }
  }, duration);
});

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
    product = res.data;
    drawCard(res.data);
    // drawTeamCard(res.data);
  } catch (error) {
    console.log(error);
  }
}
async function getAllTeam(endpoint) {
  try {
    let res = await axios(`${BASE_URL}/${endpoint}`);
    // console.log(res.data);
   
    drawTeamCard(res.data);
  } catch (error) {
    console.log(error);
  }
}
getAllData("products");
getAllTeam("team");

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
    // let count;
    let category;
    if ((category = data.filter((item) => item.category === "Toys"))) {
      toysCategory.innerText = category.length;
    }
    if ((category = data.filter((item) => item.category === "Art"))) {
      artCategory.innerText = category.length;
    }
    if ((category = data.filter((item) => item.category === "Home"))) {
      homeCategory.innerText = category.length;
    }
  });
}

// draw team card
function drawTeamCard(data) {
  teamCards.innerHTML = "";
  data.forEach((item) => {
    // console.log(item);
    teamCards.innerHTML += `
<div class="card">
<div class="our-team">
  <div class="pic">
    <img src="${item.img}" />
  </div>
  <div class="team-content">
    <h3 class="title">${item.fullname}</h3>
  </div>
  <ul class="social">
    <li>
      <a class="fa-brands fa-facebook"></a>
    </li>
    <li>
      <a class="fa-brands fa-twitter"></a>
    </li>
    <li>
      <a class="fa-brands fa-google-plus-g"></a>
    </li>
    <li>
      <a class="fa-brands fa-linkedin"></a>
    </li>
  </ul>
</div>
</div>
`;
  });
}

// category
categoryLinkElem.forEach((item) =>
  item.addEventListener("click", function () {
    if (item.textContent == "HOME & LIVING") {
      productId = "home";
      window.location.href = `./category.html?id=${productId}`;
    }
    if (item.textContent === "BABY & KINDS") {
      productId = "baby";
      window.location.href = `./category.html?id=${productId}`;
    } else {
      console.log(item.textContent);
      console.log("sef");
    }
    if (item.textContent === "ART") {
      productId = "art";
      window.location.href = `./category.html?id=${productId}`;
    }
  })
);
