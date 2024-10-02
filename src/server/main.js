const express = require("express");
const ViteExpress = require("vite-express");
const app = express();
const dal = require("./dal.js");

// create user account
app.get("/account/create/:name/:email/:password", function (req, res) {
  // else create user
  dal
    .create(req.params.name, req.params.email, req.params.password)
    .then((user) => {
      console.log(user);
      res.send(user);
    });
});

// login user
app.get("/account/login/:email/:password", function (req, res) {
  dal.login(req.params.email, req.params.password).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// find user account
app.get("/account/find/:email", function (req, res) {
  dal.find(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// find one user by email - alternative to find
app.get("/account/findOne/:email", function (req, res) {
  dal.findOne(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// update - deposit/withdraw amount
app.get("/account/update/:email/:amount", function (req, res) {
  var amount = Number(req.params.amount);

  dal.update(req.params.email, amount).then((response) => {
    console.log(response);
    res.send(response);
  });
});

// all account
app.get("/account/all", function (req, res) {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

// const port = 3000;
// app.listen(port);
// console.log("Running on port: " + port);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
