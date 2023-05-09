const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const eventController = require("./event/event.controller")

dotenv.config();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT;

app.use("/event", eventController)

app.listen(PORT, () =>{
    console.log("server is running on port 5000")
})


