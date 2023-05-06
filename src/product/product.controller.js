// Layer untuk handle req res
// handle validasi body

const express = require('express');
const router = express.Router()


// const prisma = require('../db');
const { getAllProducts, getProductById, createProduct, deleteProductById, updateProductById, getUsername } = require('./product.service');

// terima request 
// check username dan password
// hash pasword user
// simpen data user
router.post("/register", async (req, res) =>{
    // ambil nilai username, password dari body
    const { username, password } = req.body;
    const user = await getUsername(username, password);

    res.send(user)
})

// router.post("/login", (req, res) => {

// })

router.get("/", async (req, res) => {
    const products = await getAllProducts();

    //select * from product

    res.send(products)
})

router.get("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id)
        const product = await getProductById(productId);
    
        res.status(200).send(product)
        
    } catch (error) {
        res.send(error.message)
    }
})

router.post("/", async (req, res) =>{
    try {
        const productData = req.body
        const product = await createProduct(productData);
    
        res.send({
            data: product,
            message: 'produk ditambahkan'
        })
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete("/:id", async (req, res) =>{
    try {
        const productId = req.params.id
    
        await deleteProductById(parseInt(productId))
    
        res.send("produk berhasil dihapus") 
        
    } catch (error) {
        res.send(error.message)
    }
})

router.put("/:id", async (req, res) =>{
    try {
        const productId = req.params.id
        const productData = req.body
    

        if(!(productData.title && productData.description && productData.price && productData.image)){
            throw Error("fields are missing")
        }
        
        const product = await updateProductById(parseInt(productId), productData)
    
        res.send({
            data: product,
            message: "product updates successfully"
        })
        
    } catch (error) {
        res.send(error.message)
    }

})

router.patch("/:id", async (req, res) => {
    try {
        const productId = req.params.id
        const productData = req.body
    
        const product = await updateProductById(parseInt(productId), productData)
    
        res.send({
            data: product,
            message: "product updates successfully"
        })
        
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router