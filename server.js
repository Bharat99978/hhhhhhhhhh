const express = require("express");
const cors = require("cors");
const app = express();

// ✅ Use dynamic PORT for cloud deployment (fallback to 3000 for local)
const PORT = process.env.PORT || 3000;

// ✅ Bind to '0.0.0.0' for external access in cloud (not just localhost)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://${process.env.HOST || '0.0.0.0'}:${PORT}`);
});

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ✅ Dummy stock data (for testing)
let stockData = [
  { id: 1, name: "Apple", price: 185 },
  { id: 2, name: "Samsung", price: 120 },
  { id: 3, name: "Sony", price: 95 }
];

// ✅ Get all stocks
app.get("/api/stocks", (req, res) => {
  res.json(stockData);
});

// ✅ Add new stock
app.post("/api/stocks", (req, res) => {
  const newStock = {
    id: stockData.length + 1,
    name: req.body.name,
    price: req.body.price
  };
  stockData.push(newStock);
  res.json({ message: "Stock added", data: newStock });
});