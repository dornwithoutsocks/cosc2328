// HW5 – COSC 2328 – Professor McCurry
// Implemented by: Dorian Braun

// 5.2
console.log("=== BOOKSTORE INVENTORY CALCULATOR ===");

const book1 = { title: "Humble Pie", author: "Gordon Ramsay", price: 18.99 };
const book2 = { title: "Make Your Bed", author: "William H. McRaven", price: 14.50 };
const book3 = { title: "Can't Hurt Me", author: "David Goggins", price: 24.99 };

const TAX_RATE = 0.0825;
let isMember = true;

console.log("--- Book Inventory ---");
console.log("Book 1: " + book1.title + " by " + book1.author + " - $" + book1.price);
console.log("Book 2: " + book2.title + " by " + book2.author + " - $" + book2.price);
console.log("Book 3: " + book3.title + " by " + book3.author + " - $" + book3.price);

// 5.3
function calculateSubtotal(price, quantity) {
    return price * quantity;
}

function formatCurrency(amount) {
    return "$" + amount.toFixed(2);
}

console.log("--- Function Declarations Test ---");
let subtotalResult = calculateSubtotal(book1.price, 2);
console.log("Subtotal (2x " + book1.title + "): " + formatCurrency(subtotalResult));

// 5.4
const calculateTax = subtotal => subtotal * TAX_RATE;

const applyMemberDiscount = (subtotal, isMember) => {
    return isMember ? subtotal * 0.9 : subtotal;
};

console.log("--- Arrow Functions Test ---");
console.log("Tax on $100: " + formatCurrency(calculateTax(100)));
console.log("Member price ($100): " + formatCurrency(applyMemberDiscount(100, true)));
console.log("Non-member price ($100): " + formatCurrency(applyMemberDiscount(100, false)));

// 5.5 Function expression with default parameters — full order total
const calculateTotal = function(price, quantity = 1, isMember = false) {
    let subtotal = calculateSubtotal(price, quantity);
    let discounted = applyMemberDiscount(subtotal, isMember);
    let tax = calculateTax(discounted);
    return discounted + tax;
};

console.log("--- Function Expression with Defaults ---");
console.log("Full args ($" + book1.price + ", qty 2, member): " + formatCurrency(calculateTotal(book1.price, 2, true)));
console.log("Default isMember ($" + book1.price + ", qty 2): " + formatCurrency(calculateTotal(book1.price, 2)));
console.log("Default qty & isMember ($" + book1.price + "): " + formatCurrency(calculateTotal(book1.price)));

// 5.6
function calculateBulkOrder(...prices) {
    let total = 0;
    for (let price of prices) {
        total += price;
    }
    return total;
}

console.log("--- Rest Operator Test ---");
console.log("Bulk order (3 items): " + formatCurrency(calculateBulkOrder(10, 20, 30)));
console.log("Bulk order (5 items): " + formatCurrency(calculateBulkOrder(10, 15, 20, 25, 30)));

// 5.7
function processOrder(book, quantity, callback) {
    let total = callback(book.price, quantity);
    return book.title + " - Total: " + formatCurrency(total);
}

const standardPricing = (price, quantity) => price * quantity;
const memberPricing = (price, quantity) => (price * quantity) * 0.9;

console.log("--- Callback Functions ---");
console.log(processOrder(book2, 2, standardPricing));
console.log(processOrder(book2, 2, memberPricing));

// 5.8
const orderSummary = {
    customerName: "Dorian Braun",
    items: [],
    addItem(book, quantity) {
        this.items.push({ book: book, quantity: quantity });
    },
    getTotal() {
        let total = 0;
        for (let item of this.items) {
            total += item.book.price * item.quantity;
        }
        return total;
    },
    displaySummary() {
        let summary = "Order Summary for " + this.customerName + ":\n";
        for (let item of this.items) {
            summary += "- " + item.book.title + " x" + item.quantity + " ($" + item.book.price + " ea)\n";
        }
        summary += "Total: " + formatCurrency(this.getTotal());
        return summary;
    }
};

console.log("--- Object Methods ---");
orderSummary.addItem(book1, 1);
orderSummary.addItem(book3, 2);
console.log("Calculated Total: " + formatCurrency(orderSummary.getTotal()));
console.log(orderSummary.displaySummary());

// 5.9
function validateDiscount(code) {
    if (!code) {
        return 0;
    }
    
    let upperCode = code.toUpperCase();
    if (upperCode === "MEMBER10") {
        return 0.10;
    } else if (upperCode === "SAVE20") {
        return 0.20;
    }
    
    return 0;
}

console.log("--- Truthy/Falsy Validation ---");
console.log("MEMBER10 rate: " + validateDiscount("MEMBER10"));
console.log("SAVE20 rate: " + validateDiscount("SAVE20"));
console.log("Empty string rate: " + validateDiscount(""));
console.log("INVALID rate: " + validateDiscount("INVALID"));

// 5.10
function createOrderProcessor(storeName) {
    let storeTaxRate = 0.0825;

    function processStoreOrder(book, quantity) {
        let subtotal = book.price * quantity;
        let total = subtotal + (subtotal * storeTaxRate);
        return "[" + storeName + "] " + book.title + " x" + quantity + " - Total: " + formatCurrency(total);
    }

    return processStoreOrder;
}

console.log("--- Nested Functions & Closures ---");
const mainStoreProcessor = createOrderProcessor("St. Edward's University Bookstore");
console.log(mainStoreProcessor(book1, 1));
console.log(mainStoreProcessor(book2, 3));