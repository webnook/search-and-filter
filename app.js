// http://localhost:3000/items API created by json-server


const searchInput = document.getElementById("search");
const productsDOM = document.querySelector(".products-center");
const btns = document.querySelectorAll(".btn");



let allProductsData = [];
const filters = {
  searchItems: "",
};

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then(({ data }) => {
      allProductsData = data;
      renderProducts(data, filters);
    })
    .catch((err) => {
      console.log(err);
    });
});

function renderProducts(_products, _filters) {
  const filteredProducts = _products.filter((p) => {
    return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
  });
  productsDOM.innerHTML = "";
  // render to DOM
  filteredProducts.forEach((item) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `<div class="img-container">
            <img src=${item.image} alt=${item.title} />
          </div>
          <div class="product-desc">
            <p class="product-price">${item.price} $</p>
            <p class="product-title">${item.title}</p>
          </div>`;
    productsDOM.appendChild(productDiv);
  });
}
searchInput.addEventListener("input", (e) => {
  filters.searchItems = e.target.value;
  renderProducts(allProductsData, filters);
});

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filters.searchItems = e.target.dataset.filter;
    renderProducts(allProductsData, filters);
  });
});
