var express = require("express");
var mongoose = require("mongoose");
var db = require("./database/db.js"); //database connection

//connect mysql
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "cdac",
});

// console.log(db);
//to connection use schema
db();

const Schema = mongoose.Schema;

const userschema = new Schema({
  name: String,
  age: Number,
  place: String,
});

//connecting colection and schema
const MyModel = mongoose.model("users", userschema);

var app = express();

app.use(express.json());

app.get("/users", async function (req, res) {
  try {
    var result = await MyModel.find();
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});

app.post("/users", async function (req, res) {
  //   console.log(req.body);

  try {
    var record = new MyModel(req.body);
    var ans = await record.save();
    res.send("Record Inserted");
  } catch (err) {
    res.send(err.message);
  }
});

app.put("/users", function (req, res) {
  res.send("Update data into database");
});

app.delete("/users", function (req, res) {
  res.send("Deletee data into database");
});

//mysql databases
app.get("/usersinfo", function (req, res) {
  connection.query("select * from emp", function (err, data) {
    if (err) {
      res.send(err.message);
    } else {
      res.send(data);
    }
  });
});

app.post("/usersinfo", function (req, res) {
  console.log(req.body);
  connection.query("insert into emp set?", req.body, function (err, data) {
    if (err) {
      res.send(err.message);
    } else {
      res.send("Record Inserted");
    }
  });
});

app.listen(9000);
