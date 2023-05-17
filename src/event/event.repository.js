const prisma = require("../db")

const findEvent = async () => {
    const event = await prisma.event.findMany();
    return event
}

const findEventById = async (id) => {
    const event= await prisma.event.findUnique({
        where: {
            id,
        }
    })
    return event

}

const insertEvent= async (newEventData) => {
    const event= await prisma.event.create({
    data: {
        title: newEventData.title,
        description: newEventData.description,
        price: newEventData.price,
        image: newEventData.image,            
        }
    })
    return event
}

const removeEventById = async (id) => {
    const event= await prisma.event.delete({
        where: {
            id,
          }
    })
}

const editEventById = async (id, eventData) => {
    const event= await prisma.event.update({
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
    findEvent,
    findEventById,
    insertEvent,
    removeEventById,
    editEventById,
}