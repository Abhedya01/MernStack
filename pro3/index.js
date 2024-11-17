var express = require("express");
var mongoose = require("mongoose");

var db = require("./database/db.js");
var app = express();
db();

//mongodb schema
const Schema = mongoose.Schema;

const productschema = new Schema({
  pname: String,
  price: Number,
  discount: Number,
});

//connecting colection and schema
const MyModel = mongoose.model("products", productschema);

app.use(express.json());

app.get("/products", async function (req, res) {
  try {
    var result = await MyModel.find();
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});

app.post("/products", async function (req, res) {
  try {
    var record = new MyModel(req.body);
    var result = await record.save();
    res.send("Inserted data");
  } catch (err) {
    res.send(err.message);
  }
});

app.listen(9200);
