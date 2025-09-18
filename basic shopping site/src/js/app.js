// JavaScript code for the shopping website

// Dummy product data
const products = [
  { id: 1, name: "Smartphone", price: 499, category: "Electronics" },
  { id: 2, name: "T-Shirt", price: 19, category: "Clothing" },
  { id: 3, name: "Blender", price: 59, category: "Home & Kitchen" },
  { id: 4, name: "Novel", price: 12, category: "Books" },
  { id: 5, name: "Face Cream", price: 25, category: "Beauty & Personal Care" },
  { id: 6, name: "Football", price: 29, category: "Sports & Outdoors" },
  { id: 7, name: "Puzzle", price: 15, category: "Toys & Games" },
  { id: 8, name: "Car Vacuum", price: 35, category: "Automotive" },
  { id: 9, name: "Organic Rice", price: 10, category: "Groceries" },
  { id: 10, name: "Vitamins", price: 22, category: "Health & Wellness" },
];

// Utility: Get cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

// Utility: Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Render products (on products.html)
function renderProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;
  productList.innerHTML = "";
  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: $${product.price}</p>
      <button data-id="${product.id}" class="add-to-cart-btn">Add to Cart</button>
    `;
    productList.appendChild(div);
  });

  // Add event listeners
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"));
      addToCart(id);
    });
  });
}

// Add product to cart
function addToCart(productId) {
  let cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  saveCart(cart);
  alert("Added to cart!");
}

// Render cart (on cart.html)
function renderCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalDiv = document.getElementById("cart-total");
  if (!cartItemsDiv) return;
  let cart = getCart();
  cartItemsDiv.innerHTML = "";
  let total = 0;
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    if (cartTotalDiv) cartTotalDiv.textContent = "";
    return;
  }
  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) return;
    total += product.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${product.name} (x${item.qty}) - $${product.price * item.qty}</span>
      <button data-id="${item.id}" class="remove-cart-btn">Remove</button>
    `;
    cartItemsDiv.appendChild(div);
  });
  if (cartTotalDiv) cartTotalDiv.textContent = `Total: $${total}`;
  // Remove item event
  document.querySelectorAll(".remove-cart-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"));
      removeFromCart(id);
      renderCart();
    });
  });
}

// Remove from cart
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);
}

// Contact form handler (on contact.html)
function handleContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("contact-success").style.display = "block";
    form.reset();
  });
}

// On page load, initialize relevant features
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
  handleContactForm();
});
