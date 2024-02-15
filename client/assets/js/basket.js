const cards = document.querySelector(".cards");
let basketProduct = getToBasketProductLocaleStorage();
let basketCount = document.querySelector(".basketCount");
const tbody = document.querySelector("tbody");
const total = document.querySelector(".total");

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
// drawTable(basketProduct);
function drawCard(data) {
  tbody.innerHTML = "";
  // data.forEach((element) => {
  //   // let cardDiv = document.createElement("div");
  //   // let cardInfoDiv = document.createElement("div");
  //   // let pricesDiv = document.createElement("div");
  //   // let prosesDiv = document.createElement("div");
  //   // let image = document.createElement("img");
  //   // let productName = document.createElement("h2");
  //   // let productPrice = document.createElement("p");
  //   // let productOldPrice = document.createElement("p");
  //   // let addToCardBtn = document.createElement("button");
  //   // let eyeIcon = document.createElement("i");

  //   // image.src = `${element.img}`;
  //   // productName.innerHTML = `${element.productName.substring(0, 20)}...`;
  //   // productPrice.innerHTML = `$${element.price}`;
  //   // productOldPrice.innerHTML = `${element.oldPrice}`;
  //   // addToCardBtn.innerHTML = "Add to card";

  //   // cardDiv.className = "card";
  //   // cardInfoDiv.className = "info-card";
  //   // pricesDiv.className = "productPrice";
  //   // prosesDiv.className = "proses";
  //   // productOldPrice.className = "oldPrice";
  //   // addToCardBtn.className = "addToCardBtn";
  //   // eyeIcon.className = "fa-solid fa-eye";

  //   // cardDiv.append(image, cardInfoDiv);
  //   // cardInfoDiv.append(productName, pricesDiv, prosesDiv);
  //   // pricesDiv.append(productPrice, productOldPrice);
  //   // prosesDiv.append(addToCardBtn, eyeIcon);
  //   // cards.append(cardDiv);

  //   // // detail page
  //   // eyeIcon.addEventListener("click", function () {
  //   //   window.location.href = `detail.html?id=${element._id}`;
  //   // });
  //   // addToCardBtn.addEventListener("click", async function () {
  //   //   basketProduct = basketProduct.filter(
  //   //     (element) => element._id != element._id
  //   //   );
  //   //   setToBasketProductLocaleStorage(basketProduct);
  //   //   allBasketCount(basketProduct.length);
  //   //   cardDiv.remove();
  //   // });

  // });

  data.forEach((item) => {
    let tr = document.createElement("tr");
    let imgTd = document.createElement("td");
    let productName = document.createElement("td");
    let price = document.createElement("td");
    let category = document.createElement("td");
    let process = document.createElement("td");
    let subTotal = document.createElement("td");
    let count = document.createElement("td");
    let deleteBtn = document.createElement("button");
    let img = document.createElement("img");

    img.src = item.product.img;
    productName.innerHTML = item.product.productName;
    price.innerHTML = item.product.price;
    category.innerHTML = item.product.category;
    deleteBtn.innerHTML = "Delete";
    subTotal.innerHTML = item.count * item.product.price;
    count.innerHTML = item.count;

    deleteBtn.className = "delete";

    imgTd.append(img);
    process.append(deleteBtn);
    tr.append(imgTd, productName, price, count, subTotal, category, process);
    tbody.append(tr);

    // // delete product
    deleteBtn.addEventListener("click", function () {
      basketProduct = basketProduct.filter(
        (element) => element.product._id != item.product._id
      );
      setToBasketProductLocaleStorage(basketProduct);
      deleteBtn.closest("tr").remove();
      allBasketCount();
      getTotalPrice()
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
function allBasketCount() {
  basketCount.textContent = basketProduct.reduce(
    (acc, curr) => acc + curr.count,
    0
  );
}
allBasketCount();


// total price
function getTotalPrice(){
  let sum=basketProduct.reduce((acc,curr)=>acc+curr.count*curr.product.price,0)
  total.textContent=sum

}
getTotalPrice()