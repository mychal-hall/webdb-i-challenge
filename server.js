const express = require("express");

const server = express();

const Accounts = require("./data/accounts-model.js");
// your code here

server.use(express.json());

server.get("/api/accounts", async (req, res) => {
  try {
    const accounts = await Accounts.find();
    res.status(200).json(accounts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving accounts" });
  }
});



module.exports = server;
