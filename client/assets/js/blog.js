let blogCards = document.querySelector(".blog-products");

async function getAllData(endpoint) {
  try {
    let res = await axios(`${BASE_URL}/${endpoint}`);
    // console.log(res.data);
    drawCard(res.data.slice(0, 5));
  } catch (error) {
    console.log(error);
  }
}
getAllData("products");

function drawCard(data) {
  blogCards.innerHTML = "";
  data.forEach((element) => {
    blogCards.innerHTML += `
    <div class="card text-left">
                  <img src="${element.img}" alt="">
                  <div class="card-body">
                    <h4 class="card-title">${element.productName}</h4>
                    <p class="card-text">${element.description}</p>
                  </div>
                </div>
    `;
  });
}
