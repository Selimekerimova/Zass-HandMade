let product = document.querySelector(".product");
let favProducts = getProductLocaleStorage();
let backToBtn = document.querySelector(".backToBtn");
const BASE_URL = `http://localhost:8080`;
// let allProductsCard = document.querySelector(".allProductsCard");

let id = new URLSearchParams(window.location.search).get("id");

// console.log(id);
// go back
backToBtn.addEventListener("click", function () {
  history.back();
});
// get data
async function getAllData(endpoint) {
  try {
    let res = await axios(`${BASE_URL}/${endpoint}`);
    // console.log(res.data);
    drawDetailCard(res.data);
  } catch (error) {
    console.log(error);
  }
}
getAllData("products");

// draw detail card

function drawDetailCard(data) {
  product.innerHTML = "";
  data.forEach((element) => {
    if (element.id == id) {
      let cardDiv = document.createElement("div");
      let leftDiv = document.createElement("div");
      let rightDiv = document.createElement("div");
      let pricesDiv = document.createElement("div");
      let image = document.createElement("img");
      let productName = document.createElement("h1");
      let productPrice = document.createElement("p");
      let productOldPrice = document.createElement("p");
      let productDescriptionDiv = document.createElement("div");
      let favBasketDiv = document.createElement("div");
      let productDescription = document.createElement("p");
      let favIcon = document.createElement("i");

      image.src = `${element.img}`;
      productName.innerHTML = `${element.productName}`;
      productPrice.innerHTML = `$${element.price}  - - - -`;
      productOldPrice.innerHTML = `$${element.oldPrice}`;
      productDescription.innerHTML = `${element.description}`;
      favIcon.innerHTML="Add to wishlist"

      cardDiv.className = "card";
      leftDiv.className = "left";
      rightDiv.className = "right";
      pricesDiv.className = "productPrice";
      productName.className = "productName";
      productOldPrice.className="oldPrice"
      productDescriptionDiv.className = "text";
      favIcon.className = favProducts.find((item) => item.id === element.id)
        ? "fa-solid fa-heart"
        : "fa-regular fa-heart";

      cardDiv.append(leftDiv, rightDiv);
      rightDiv.append(
        productName,
        pricesDiv,
        productDescriptionDiv,
        favBasketDiv
      );
      favBasketDiv.append(favIcon);
      pricesDiv.append(productPrice, productOldPrice);
      productDescriptionDiv.append(productDescription);
      leftDiv.append(image);
      product.append(cardDiv);
      // add to fav

      favIcon.addEventListener("click", function () {
        this.className === "fa-regular fa-heart"
          ? (this.className = "fa-solid fa-heart")
          : (this.className = "fa-regular fa-heart");

        let favProduct = getProductLocaleStorage();

        let favIndex = favProduct.findIndex((item) => item.id === element.id);

        if (favIndex === -1) {
          favProduct.push(element);
        } else {
          favProduct.splice(favIndex, 1);
        }
        setProductLocaleStorage(favProduct);
        favoriteCount(favProduct.length);
      });
    }
  });
}

// all products card

// function drawCard(data) {
//   allProductsCard.innerHTML = "";
//   data.forEach((element) => {
//     let cardDiv = document.createElement("div");
//     let cardInfoDiv = document.createElement("div");
//     let pricesDiv = document.createElement("div");
//     let prosesDiv = document.createElement("div");
//     let image = document.createElement("img");
//     let productName = document.createElement("h2");
//     let productPrice = document.createElement("p");
//     let productOldPrice = document.createElement("p");
//     let addToCardBtn = document.createElement("button");
//     let eyeIcon = document.createElement("i");
//     let favIcon = document.createElement("i");

//     image.src = `${element.img}`;
//     productName.innerHTML = `${element.productName.substring(0, 20)}...`;
//     productPrice.innerHTML = `$${element.price}`;
//     productOldPrice.innerHTML = `${element.oldPrice}`;
//     addToCardBtn.innerHTML = "Add to card";

//     cardDiv.className = "card";
//     cardInfoDiv.className = "info-card";
//     pricesDiv.className = "productPrice";
//     prosesDiv.className = "proses";
//     productOldPrice.className = "oldPrice";
//     addToCardBtn.className = "addToCardBtn";
//     eyeIcon.className = "fa-solid fa-eye";
//     favIcon.className = favProducts.find((item) => item.id === element.id)
//       ? "fa-solid fa-heart"
//       : "fa-regular fa-heart";

//     cardDiv.append(image, cardInfoDiv);
//     cardInfoDiv.append(productName, pricesDiv, prosesDiv);
//     pricesDiv.append(productPrice, productOldPrice);
//     prosesDiv.append(addToCardBtn, favIcon, eyeIcon);
//     allProductsCard.append(cardDiv);

//     // add to fav

//     favIcon.addEventListener("click", function () {
//       this.className === "fa-regular fa-heart"
//         ? (this.className = "fa-solid fa-heart")
//         : (this.className = "fa-regular fa-heart");

//       let favProduct = getProductLocaleStorage();

//       let favIndex = favProduct.findIndex((item) => item.id === element.id);

//       if (favIndex === -1) {
//         favProduct.push(element);
//       } else {
//         favProduct.splice(favIndex, 1);
//       }
//       setProductLocaleStorage(favProduct);
//       favoriteCount(favProduct.length);
//     });
//   });
// }

// setLocaleStorage
function setProductLocaleStorage(arr) {
  localStorage.setItem("fav", JSON.stringify(arr));
}

// getLocaleStorage
function getProductLocaleStorage() {
  return JSON.parse(localStorage.getItem("fav")) || [];
}
