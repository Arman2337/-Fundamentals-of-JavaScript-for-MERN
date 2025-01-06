let product = [];

// Add Product: Function to add a new product to the cart
const addProduct = (productName,price,quantity) => {
    if(price < 0 || quantity < 1){
        console.log("Price must be postive and quantitymust be at least 1.");
        return;
    }
    product.push({productName,price,quantity});
};

// Calculate Total: Use reduce() to calculate the total cost of items in the cart
const calculateTotal = () => {
    return product.reduce((total, product) => total + product.price * product.quantity, 0);
};

// Remove Product: Arrow function to remove a product by name
const removeProduct = (productName) => {
    product = product.filter(product => product.productName !== productName);
};

// Log product details using destructuring
const logProductDetails = () => {
    console.log("Product Details:");
    product.forEach(({ productName, price, quantity }) => {
        console.log(`Product: ${productName}, Price: $${price}, Quantity: ${quantity}`);
    });
};

// Display cart summary using template literals
const displayCartSummary = () => {
    console.log("Cart Summary:");
    product.forEach(products => {
        console.log(`Product: ${products.productName}, Price: $${products.price}, Quantity: ${products.quantity}`);
    });
    console.log(`Total Cost: $${calculateTotal().toFixed(2)}`);
};

// Example usage
addProduct("Laptop", 1200, 1);
addProduct("Smartphone", 800, 2);
addProduct("Headphones", 100, 3);


// Log product details
logProductDetails();

// Display cart summary
displayCartSummary();

// Remove a product
removeProduct("Smartphone");

// Display cart summary after removal
displayCartSummary();


