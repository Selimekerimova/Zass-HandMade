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
function drawCard(data) {
  tbody.innerHTML = "";
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

    // delete product
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