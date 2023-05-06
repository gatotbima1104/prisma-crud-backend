const prisma = require("../db")
const bcrypt = require('bcrypt');


const createUser = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  
    return user;
  };

const findProduct = async () => {
    const product = prisma.product.findMany();
    return product
}

const findProductById = async (id) => {
    const product = await prisma.product.findUnique({
        where: {
            id,
        }
    })
    return product
}

const insertProduct = async (newProductData) => {
    const product = await prisma.product.create({
    data: {
        title: newProductData.title,
        description: newProductData.description,
        price: newProductData.price,
        image: newProductData.image,            
        }
    })
    return product
}

const removeProductById = async (id) => {
    const product = await prisma.product.delete({
        where: {
            id,
          }
    })
}

const edtiProductById = async (id, productData) => {
    const product = await prisma.product.update({
        where: {
            id,
        },        
        data: {
            title: productData.title,
            description: productData.description,
            price: productData.price,
            image: productData.image,            
        }
    })
    return product
}


module.exports = {
    findProduct,
    findProductById,
    insertProduct,
    removeProductById,
    edtiProductById,
    createUser
}