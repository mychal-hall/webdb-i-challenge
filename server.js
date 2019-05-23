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

server.post("/api/accounts", async (req, res) => {
  try {
    const account = await Accounts.add(req.body);
    res.status(201).json(account);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding a new account" });
  }
});

server.get("/api/accounts/:id", async (req, res) => {
  try {
    const account = await Accounts.findById(req.params.id);
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(404).json({ message: "No account with that ID exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving data" });
  }
});

server.delete("/api/accounts/:id", async (req, res) => {
  try {
    const count = await Accounts.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The account has been removed" });
    } else {
      res
        .status(404)
        .json({ message: "The account with that ID does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error, could not remove the account" });
  }
});

module.exports = server;
