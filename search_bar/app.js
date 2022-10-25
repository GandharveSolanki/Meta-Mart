const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const localurl = "mongodb://localhost:27017/myapp";

mongoose.connect("mongodb+srv://deep:test1234@testcluster.dqxwptd.mongodb.net/ecomDb?retryWrites=true&w=majority", function (err) {
    if (err) {
        console.log("connection error");
        console.log(err);
        mongoose.disconnect();
    } else {
        console.log("successfully connected");
    }
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/searchbar.html");
});

var productschema = new mongoose.Schema({
    Seller_Name: String,
    Product_Name: String,
    Product_description: String,
    Product_Category: String,
    Product_quantity: Number,
    Product_price: Number,
    Selling_price: Number,
    Phone: Number,
    Email: String,
    Address: String,
    First_img: String,
    Second_img: String,
    Third_img: String,
    Fourth_img: String,
    Fifth_img: String,
});

const forminputs = new mongoose.model("Productinputs", productschema);


app.get('/autocomplete/', function (req, res, next) {

    var regex = new RegExp(req.query["term"], 'i');

    var productfilter = forminputs.find({ Product_Name: regex }, { 'Product_Name': 1 }).sort({ "updated_at": -1 }).sort({ "created_at": -1 }).limit(5);
    productfilter.exec(function (err, data) {
        console.log(data);

        var result = [];
        if (!err) {
            if (data && data.length && data.length > 0) {
                data.forEach(user => {
                    let obj = {
                        id: user._id,
                        label: user.Product_Name
                    };
                    result.push(obj);
                });
            }
            res.jsonp(result);
        }
    });
});

app.listen(3000, function () {
    console.log("Server has started successfully.");
});