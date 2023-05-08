const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const productController = require("./product/product.controller")

dotenv.config();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT;

app.use("/product", productController)

app.listen(PORT, () =>{
    console.log("server is running on port 5000")
})


