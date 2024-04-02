// http://localhost:3000/items API created by json-server
const searchInput = document.getElementById("search");
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
  console.log(filteredProducts);
  // render to DOM
}
searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  filters.searchItems = e.target.value;
  renderProducts(allProductsData, filters);
});
