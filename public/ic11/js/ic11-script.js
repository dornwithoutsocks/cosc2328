// IC11 – COSC 2328 – Professor McCurry
// Implemented by: Dorian Braun

// step 5 - function declarations
console.log("- - - Function Declarations - - -");
function greet(name) {return "Hello, " + name + "!";}
console.log(greet("Dorian"));

function area(width, height) {return width * height;}
console.log("Area of 4 X 5 = " + area(4, 5));

// step 6 - funcion expressions + arrow functions
console.log("- - - Function Expressions & Arrow Functions - - -");

const multiply = function(a, b) {return a * b;};
const divide = (a, b) => {return a / b;}; // explicit return
const square = n => n * n; // implicit return
console.log("multiply(3, 6) = " + multiply(3, 6));
console.log("divide(20, 5) = " + divide(20, 5));
console.log("square(7) = " + square(7));

// step 7 - default parameters and rest operator
console.log("- - - Default Parameters & Rest Operator - - -");
function greetUser(name, greeting = "Hello") {return greeting + ", " + name + "!";}
console.log(greetUser("Dorian")); // uses default
console.log(greetUser("Dorian", "sup")); // overrides default

function sumAll(...numbers) {
    let total = 0;
    for (const n of numbers) {total += n;}
    return total;
}

console.log("sumAll(1, 2, 3) = " + sumAll(1, 2, 3));

// step 8 - callback functions
console.log("- - - Callback Functions - - -");

function processNumber(value, callback) {
    console.log("Processing " + value + "...");
    return callback(value);
}

const double = n => n * 2;
const triple = n => n * 3;

console.log("double -> " + processNumber(5, double));
console.log("triple -> " + processNumber(5, triple));

//step 9 - object methods with this
console.log("- - - Object Methods with (this) - - -");
const product = {
    brand: "Acme",
    price: 12.5,
    quantity: 4,
    total() {return this.price * this.quantity;},
    describe() {
        return this.quantity + " x " + this.brand + " @ $" + this.price + " each = $" + this.total().toFixed(2);
    }
};

console.log("Total: $" + product.total().toFixed(2));
console.log(product.describe());
