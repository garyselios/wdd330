import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

function init() {
  const dataSource = new ProductData("tents");
  const listElement = document.querySelector(".product-list");

  if (!listElement) {
    console.error("No se encontró .product-list en el DOM");
    return;
  }

  const productList = new ProductList("tents", dataSource, listElement);
  productList.init();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
