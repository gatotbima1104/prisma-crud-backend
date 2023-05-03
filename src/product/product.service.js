// handle bisnis logic
// dipisah agar tenggung jawabnya terisolate dan fungsionalnya reusable

// const prisma = require("../db");
const { findProduct, findProductById, insertProduct, removeProductById, edtiProductById } = require("./product.repository");

const getAllProducts = async () => {
    const product = await findProduct();

    // .. tambah logic disini
    return product 
};

const getProductById = async (id) => {

    const product = await findProductById(id)

    if(!product){
       throw Error("Product not found")
    }

    return product
}

const createProduct = async (newProductData) =>{
    const product = await insertProduct(newProductData)
    return product;
}

const deleteProductById = async (id) => {
    await getProductById(id) // reusable from getProducById
    await removeProductById(id)
}

const updateProductById = async (id, productData) => {
    await getProductById(id) // reusable from getProducById
    const product = edtiProductById(id, productData) //reusable from edtiProductById

    return product
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    updateProductById,
    
}
