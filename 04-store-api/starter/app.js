require('dotenv').config();

// async errors
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const {
  getAllProductsStatic,
  getAllProducts,
} = require('./controllers/products');

// middleware
app.use(express.json());

// routes

app.get('/', (req, res) => {
  res.send(`<h1>Store API</h1><a href="/api/v1/products">products route</a>`);
});

app.use('/api/v1/products', productsRouter);

// products route

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connect db
    await connectDB(process.env.MONGO_URI);
    console.log(`CONNECTED TO MONGO DB ...`);

    app.listen(port, console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
