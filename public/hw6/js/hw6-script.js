// HW6 – COSC 2328 – Professor McCurry
// Implemented by: Dorian Braun

const productPrices = {
  macbook: 1399.99,
  iphone: 1999.99,
  laptop: 1799.99,
  photographyCourse: 9999.99
};

const discountCodes = {
  MILITARY: 0.20,
  MCCURRY: 0.50,
  STEDS10: 0.10
};

const calculateTax = (subtotal) => subtotal * 0.0825;

const applyDiscount = function(subtotal, code) {
  const formattedCode = code.toUpperCase();
  if (discountCodes[formattedCode]) {
    return subtotal * discountCodes[formattedCode];
  }
  return 0;
};

const orderForm = document.getElementById("orderForm");
const productSelect = document.getElementById("product");
const quantityInput = document.getElementById("quantity");
const discountCodeInput = document.getElementById("discountCode");
const resultsBox = document.getElementById("results");

const resProduct = document.getElementById("resProduct");
const resQuantity = document.getElementById("resQuantity");
const resSubtotal = document.getElementById("resSubtotal");
const resDiscount = document.getElementById("resDiscount");
const resTax = document.getElementById("resTax");
const resTotal = document.getElementById("resTotal");

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedProduct = productSelect.value;
  const quantity = Number(quantityInput.value);
  const discountCode = discountCodeInput.value.trim();

  const price = productPrices[selectedProduct];

  if (!selectedProduct || !price || quantity < 1) {
    alert("Please select a valid product and quantity.");
    return;
  }

  const subtotal = price * quantity;
  const discount = applyDiscount(subtotal, discountCode);
  const subtotalAfterDiscount = subtotal - discount;
  const tax = calculateTax(subtotalAfterDiscount);
  const total = subtotalAfterDiscount + tax;

  resProduct.textContent = selectedProduct;
  resQuantity.textContent = quantity;
  resSubtotal.textContent = "$" + subtotal.toFixed(2);
  resDiscount.textContent = "-$" + discount.toFixed(2);
  resTax.textContent = "$" + tax.toFixed(2);
  resTotal.textContent = "$" + total.toFixed(2);

  resultsBox.classList.remove("results-hidden");
});