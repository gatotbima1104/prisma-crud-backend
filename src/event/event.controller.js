// Layer untuk handle req res
// handle validasi body
const express = require('express');
const router = express.Router()

// const prisma = require('../db');
const { getAllevents, geteventById, createevent, deleteeventById, updateeventById, insertUser, } = require('./event.service');

// terima request 
// check username dan password
// hash pasword user
// simpen data user
router.post('/register', async (req, res) => {
    const {name, password} = req.body;
    const userRegister = await insertUser(name, password);
    
    return(userRegister)
})

app.post('/login', async (req, res) => {
    const {name, password} = req.body;
    try {
        const findUser = await prisma.user.findFirst({
            where: {
                name,
            }
        })

        if(!findUser){
            res.send("user not found")
        }
    
        const isValidPassword = bcrypt.compareSync(password, findUser.password)
    
        if(!isValidPassword){
            res.send("password salah")
        }
        
        res.send({
            message: "login success",
            data: findUser
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})


router.get("/", async (req, res) => {
    const events = await getAllevents();

    //select * from event

    res.send(events)
})

router.get("/:id", async (req, res) => {
    try {
        const eventId = parseInt(req.params.id)
        const event = await geteventById(eventId);
    
        res.status(200).send(event)
        
    } catch (error) {
        res.send(error.message)
    }
})

router.post("/", async (req, res) =>{
    try {
        const eventData = req.body
        const event = await createevent(eventData);
    
        res.send({
            data: event,
            message: 'produk ditambahkan'
        })
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete("/:id", async (req, res) =>{
    try {
        const eventId = req.params.id
    
        await deleteeventById(parseInt(eventId))
    
        res.send("produk berhasil dihapus") 
        
    } catch (error) {
        res.send(error.message)
    }
})

router.put("/:id", async (req, res) =>{
    try {
        const eventId = req.params.id
        const eventData = req.body
    

        if(!(eventData.title && eventData.description && eventData.price && eventData.image)){
            throw Error("fields are missing")
        }
        
        const event = await updateeventById(parseInt(eventId), eventData)
    
        res.send({
            data: event,
            message: "event updates successfully"
        })
        
    } catch (error) {
        res.send(error.message)
    }

})

router.patch("/:id", async (req, res) => {
    try {
        const eventId = req.params.id
        const eventData = req.body
    
        const event = await updateeventById(parseInt(eventId), eventData)
    
        res.send({
            data: event,
            message: "event updates successfully"
        })
        
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router