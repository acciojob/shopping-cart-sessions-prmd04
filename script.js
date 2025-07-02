// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

//  Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });
}

// Render cart from sessionStorage
function renderCart() {
  cartList.innerHTML = "";
  const cartData = sessionStorage.getItem("cart");
  if (!cartData) return;

  const cart = JSON.parse(cartData);

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove from Cart";
    removeBtn.classList.add("remove-btn");
    removeBtn.setAttribute("data-index", index);

    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });
}

function removeFromCart(index) {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Remove item at the given index
  cart.splice(index, 1);

  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

//  Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cartData = sessionStorage.getItem("cart");
  const cart = cartData ? JSON.parse(cartData) : [];

  cart.push(product);

  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

//  Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

//  Set up event listeners

// For Add to Cart (event delegation)
productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = Number(e.target.getAttribute("data-id"));
    addToCart(productId);
  }
});
cartList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const index = Number(e.target.getAttribute("data-index"));
    removeFromCart(index);
  }
});

// For Clear Cart
clearCartBtn.addEventListener("click", clearCart);

// Initial render on page load
renderProducts();
renderCart();
