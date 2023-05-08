// handle bisnis logic
// dipisah agar tenggung jawabnya terisolate dan fungsionalnya reusable

const { findevent, findeventById, insertevent, removeeventById, edtieventById, createUser  } = require("./event.repository");

// const getUsername = async (username) => {
//     const userRegister = await findUser(username);

//     if(userRegister){
//         res.status(400).send("username sudah terdaftar")
//     }
    

//     const hashPassword = bcrypt.hashSync(password, 10);
//     // const passwordHash = bcrypt.hashSync(password, 10)

//     await prisma.user.create({
//         username,
//         password: hashPassword,
//     })

//     res.status(201).send("user berhasil dibuat")
// }   

const insertUser = async (name, password) => {
    const user = await createUser(name, password);

    // .. tambah logic disini
    return user 
}

const getAllevents = async () => {
    const event = await findevent();

    // .. tambah logic disini
    return event 
};

const geteventById = async (id) => {

    const event = await findeventById(id)

    if(!event){
       throw Error("event not found")
    }

    return event
}

const createevent = async (neweventData) =>{
    const event = await insertevent(neweventData)
    return event;
}

const deleteeventById = async (id) => {
    await geteventById(id) // reusable from getProducById
    await removeeventById(id)
}

const updateeventById = async (id, eventData) => {
    await geteventById(id) // reusable from getProducById
    const event = edtieventById(id, eventData) //reusable from edtieventById

    return event
}


module.exports = {
    getAllevents,
    geteventById,
    createevent,
    deleteeventById,
    updateeventById,
    insertUser
    
}
