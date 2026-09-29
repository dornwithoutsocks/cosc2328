// IC10 - COSC2328 - Professor McCurry
// Implemented by: Dorian Braun

//step 5 - variables and concatenation

const city = "Frankfurt";
const country = "Germany"
let population = 2700000;

console.log("Location: " + city + ", " + country);
console.log("Population: " + population);

// step 6 - a decision
if (population > 1000000) {
    console.log("This is a metropolis.");
} else {
    console.log("This is a growing city.");
}

// step 7 - boolean
let isLoggedIn = true;
if (isLoggedIn) {
    console.log("Welcome!");
} else {
    console.log("Please log in.");
}

// step 8 - truthy / falsy
let username = 123;
if (username) {
    console.log("Username accepted: " + username);
} else {
    console.log("Username is required.");
}

// step 9 - combined logic
const hasAccount = true;
const isEmailVerified = false;
const agreedToTerms = true;
if ((hasAccount && agreedToTerms) || isEmailVerified) {
    console.log("Registration Allowed");
} else {
    console.log("Registration Blocked");
}