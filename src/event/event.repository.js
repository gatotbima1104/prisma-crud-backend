const prisma = require("../db")
// const bcrypt = require('bcrypt');

const createUser = async (name, password) => {
    const findUser = await prisma.user.findFirst({
        where: {
            name,
        }
    })

    if(findUser){
        res.send("username has been taken")
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    await prisma.user.create({
       data: {
        name,
        password: hashedPassword
       },
       
    })
    prisma

    res.send('user created')
}

const findevent = async () => {
    const event = prisma.event.findMany();
    return event
}

const findeventById = async (id) => {
    const event = await prisma.event.findUnique({
        where: {
            id,
        }
    })
    return event

}

const insertevent = async (neweventData) => {
    const event = await prisma.event.create({
    data: {
        title: neweventData.title,
        description: neweventData.description,
        price: neweventData.price,
        image: neweventData.image,            
        }
    })
    return event
}

const removeeventById = async (id) => {
    const event = await prisma.event.delete({
        where: {
            id,
          }
    })
}

const edtieventById = async (id, eventData) => {
    const event = await prisma.event.update({
        where: {
            id,
        },        
        data: {
            title: eventData.title,
            description: eventData.description,
            price: eventData.price,
            image: eventData.image,            
        }
    })
    return event
}


module.exports = {
    findevent,
    findeventById,
    insertevent,
    removeeventById,
    edtieventById,
    createUser
}