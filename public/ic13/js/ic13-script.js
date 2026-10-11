// IC13 – COSC 2328 – Professor McCurry
// Implemented by: [Your Full Name]

// - - - Order State - - -
let selectedProduct = null;
let quantity = 1;
let discountRate = 0;

// - - - The Display-Update Function - - -
function updateDisplay() {
const summaryProduct = document.querySelector("#summary-product");
const summaryTotal = document.querySelector("#summary-total");

if (selectedProduct !== null) {
summaryProduct.textContent = selectedProduct.name;
const rawTotal = selectedProduct.price * quantity;
const discountedTotal = rawTotal * (1 - discountRate);
summaryTotal.textContent = "Total: $" + discountedTotal.toFixed(2);
} else {
summaryProduct.textContent = "No product selected";
summaryTotal.textContent = "Total: $0";
}
}

// - - - Click + Event Delegation - - -
const productGallery = document.querySelector("#product-gallery");
const productNameInput = document.querySelector("#product-name");

productGallery.addEventListener("click", function (event) {
const card = event.target.closest(".product-card");
if (!card) return;

const name = card.dataset.productName;
const price = parseFloat(card.dataset.price);

selectedProduct = { name: name, price: price };
productNameInput.value = selectedProduct.name;
updateDisplay();
});

// - - - Keyboard Events and Live Discount - - -
const promoCodeInput = document.querySelector("#promo-code");
const promoMessage = document.querySelector("#promo-message");

promoCodeInput.addEventListener("keyup", function (event) {
const typed = promoCodeInput.value.trim();

if (typed === "") {
promoMessage.textContent = "";
promoMessage.style.color = "#666";
discountRate = 0;
} else if (typed.toUpperCase() === "SAVE10") {
promoMessage.textContent = "Success: 10% discount applied!";
promoMessage.style.color = "#28a745";
discountRate = 0.10;
} else {
promoMessage.textContent = "Invalid promo code";
promoMessage.style.color = "#dc3545";
discountRate = 0;
}

updateDisplay();
});

// - - - Form Submit - - -
const orderForm = document.querySelector("#order-form");

orderForm.addEventListener("submit", function (event) {
event.preventDefault();

if (selectedProduct === null) {
alert("Please select a product before placing your order.");
return;
}

const rawTotal = selectedProduct.price * quantity;
const finalTotal = (rawTotal * (1 - discountRate)).toFixed(2);

alert("Order Placed!\nProduct: " + selectedProduct.name + "\nQuantity: " + quantity + "\nTotal: $" + finalTotal);
});