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
    let cardDivElem=document.createElement("div")
    let image=document.createElement("img")
    let cardBody=document.createElement("div")
    let productName=document.createElement("h4")
    let description=document.createElement("p")

    cardDivElem.className="card text-left"
    cardBody.className="card-body"
    productName.className="card-title"
    description.className="card-text"

  
    cardDivElem.append(image,cardBody,productName,description)
    blogCards.append(cardDivElem)
  });
}
