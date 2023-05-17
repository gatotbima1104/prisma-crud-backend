// handle bisnis logic
// dipisah agar tenggung jawabnya terisolate dan fungsionalnya reusable

// const bcrypt = require("bcrypt");
const { findEvent, findEventById, insertEvent, removeEventById, editEventById } = require("./event.repository");

const catchEvents = async () => {
    const event= await findEvent();

    // .. tambah logic disini
    return event
};

const getEventById = async (id) => {

    const event= await findEventById(id)

    if(!event){
       throw Error("event not found")
    }

    return event
}

const createEvent= async (neweventData) =>{
    const event= await insertEvent(neweventData)
    return event;
}

const deleteEventById = async (id) => {
    await getEventById(id) // reusable from getProducById
    await removeEventById(id)
}

const updateEventById = async (id, eventData) => {
    await getEventById(id) // reusable from getProducById
    const event= editEventById(id, eventData) //reusable from edtieventById

    return event
}


module.exports = {
    catchEvents,
    getEventById,
    createEvent,
    deleteEventById,
    updateEventById,
    
}
