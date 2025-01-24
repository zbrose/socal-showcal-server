const db = require("./models");

// const { create } = require("./models/event");

// const createEvent = () => {
//   const newEvent = db.Event.create({
//     title: "Super Sick Show",
//     date: Date.now(),
//     time: "5:15pm",
//     address: "355 S Cochran",
//     city: "Los Angeles",
//     state: "CA",
//     zipcode: 90036,
//     cover: 10,
//     genre: "Folk",
//     details: "For people who like blake mills",
//   });
// };

// createEvent();

const User = require("./models/user"); // Import the User model

const createUser = async () => {
  try {
    const newUser = await User.create({
      username: "Weston",
      email: "weston@weston.gov",
      password: "password1234",
    });
    console.log("New User Created:", newUser);
  } catch (err) {
    console.error("Error creating user:", err);
  }
};

createUser();
