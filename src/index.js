const express = require('express');
const dotenv = require('dotenv');
const app = express();
const productController = require("./product/product.controller")

dotenv.config();

app.use(express.json());

const PORT = process.env.PORT;

app.use("/product", productController)

app.listen(PORT, () =>{
    console.log("server is running on port 3000")
})


