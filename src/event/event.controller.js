// Layer untuk handle req res
// handle validasi body
const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");
const bcrypt = require('bcrypt');

// const prisma = require('../db');
const {
  catchEvents,
  getEventById,
  createEvent,
  deleteEventById,
  updateEventById,
} = require("./event.service");
const { insertUser } = require("../user/user.service");

// terima request
// check username dan password
// hash pasword user
// simpen data user
router.post("/register", async (req, res) => {
  const { name, password } = req.body;
  const userRegister = await insertUser(name, password);

  return userRegister;
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const findUser = await userLogin(name, password);

  if (!findUser) {
    res.send("user not found");
  }

  const isValidPassword = bcrypt.compareSync(password, findUser.password);

  if (!isValidPassword) {
    res.send("password salah");
  }

  res.redirect("/dashboard").send({
    message: "login success",
    data: findUser,
  });
});

router.get("/dashboard", async (req, res) => {
  try {
    const user = await getCurrentUser(req.session.userId);

    res.render("dashboard", { user })
  } catch (error) {
    res.redirect("/login");
  }
})

router.get("/", async (req, res) => {
  const events = await catchEvents();

  //select * from event

  res.send(events);
});

router.get("/:id", async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const event = await getEventById(eventId);

    res.status(200).send(event);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const eventData = req.body;
    const event = await createEvent(eventData);

    res.send({
      data: event,
      message: "Event ditambahkan",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;

    await deleteEventById(parseInt(eventId));

    res.send("Event berhasil dihapus");
  } catch (error) {
    res.send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const eventData = req.body;

    if (
      !(
        eventData.title &&
        eventData.description &&
        eventData.price &&
        eventData.image
      )
    ) {
      throw Error("fields are missing");
    }

    const event = await updateEventById(parseInt(eventId), eventData);

    res.send({
      data: event,
      message: "eventupdates successfully",
    });
  } catch (error) {
    res.send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const eventData = req.body;

    const event = await updateEventById(parseInt(eventId), eventData);

    res.send({
      data: event,
      message: "event updates successfully",
    });
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
