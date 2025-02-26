const express = require('express');
const app = express();
const port = 3000;

// Mock product catalog data
const products = [
  { id: 1, name: 'Laptop', category: 'electronics', price: 1200 },
  { id: 2, name: 'Smartphone', category: 'electronics', price: 800 },
  { id: 3, name: 'Shirt', category: 'clothing', price: 30 },
  { id: 4, name: 'Shoes', category: 'clothing', price: 50 },
  { id: 5, name: 'Headphones', category: 'electronics', price: 200 },
  { id: 6, name: 'Coffee Mug', category: 'home', price: 15 }
];

// Middleware to handle JSON requests
app.use(express.json());

// GET /products - Return all products
app.get('/products', (req, res) => {
  let filteredProducts = products;

  // Filter by category if provided in the query string
  if (req.query.category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }

  res.json(filteredProducts);
});

// GET /products/:id - Fetch a specific product by ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
