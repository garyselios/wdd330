import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    
    // Asegurar que el DOM está listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.renderProductDetails());
    } else {
      this.renderProductDetails();
    }
    
    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    console.log('Adding product:', this.product);
    
    let cartContents = getLocalStorage('so-cart');
    let cart = Array.isArray(cartContents) ? cartContents : [];
    
    cart.push(this.product);
    setLocalStorage('so-cart', cart);
    
    console.log('Cart updated:', getLocalStorage('so-cart'));
  }

  renderProductDetails() {
    console.log('Rendering product details...');
    
    // Verificar que los elementos existen
    const brandEl = document.querySelector('#productBrand');
    const nameEl = document.querySelector('#productName');
    const imgEl = document.querySelector('#productImage');
    const priceEl = document.querySelector('#productPrice');
    const descEl = document.querySelector('#productDescription');
    const btnEl = document.querySelector('#addToCart');
    
    console.log('Elementos encontrados:', { brandEl, nameEl, imgEl, priceEl, descEl, btnEl });
    
    if (!imgEl) {
      console.error('❌ No se encontró #productImage');
      return;
    }
    
    const imageFileName = this.product.Image.split('/').pop();
    
    brandEl.innerText = this.product.Brand.Name;
    nameEl.innerText = this.product.NameWithoutBrand;
    imgEl.src = `/images/${imageFileName}`;
    imgEl.alt = this.product.Name;
    priceEl.innerText = `$${this.product.FinalPrice}`;
    descEl.innerHTML = this.product.DescriptionHtmlSimple;
    btnEl.dataset.id = this.product.Id;
    
    console.log('✅ Producto renderizado correctamente');
  }
}