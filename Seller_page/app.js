const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const uri = "mongodb+srv://deep:test1234@clustername.mongodb.net/ecom-register-DB?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const url = "mongodb+srv://deep:test1234@testcluster.dqxwptd.mongodb.net/ecomDb?retryWrites=true&w=majority";
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


app.use(express.static('Register_form/public'));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

const formdata = new mongoose.Schema({
    Name: { type: String, required: "Seller name is required" },
    Product_Name: { type: String, required: "cannot proceed without product name" },
    Product_Category: { type: String, required: "cannot proceed without a category" },
    Product_quantity: { type: Number, required: "quantity is required" },
    Product_price: { type: Number, required: "quantity is required" },
    Phone: { type: Number, required: "phone number is required" },
    Email: { type: String, required: "email is required" },
    Address: { type: String, required: "please enter address" },
    First_img: { type: String, required: "5 images are compulsory" },
    Second_img: { type: String, required: "5 images are compulsory" },
    Third_img: { type: String, required: "5 images are compulsory" },
    Fourth_img: { type: String, required: "5 images are compulsory" },
    Fifth_img: { type: String, required: "5 images are compulsory" }
});

const forminputs = new mongoose.model("Productinputs", formdata);

app.post("/", async function (req, res) {
    const productdata = new forminputs({
        Name: req.body.seller_name,
        Product_Name: req.body.product_name,
        Product_Category: req.body.product_category,
        Product_quantity: req.body.product_quantity,
        Product_price: req.body.product_price,
        Phone: req.body.mobile_no,
        Email: req.body.email,
        Address: req.body.address,
        First_img: req.body.imageLink_1,
        Second_img: req.body.imageLink_2,
        Third_img: req.body.imageLink_3,
        Fourth_img: req.body.imageLink_4,
        Fifth_img: req.body.imageLink_5
    });
    await productdata.save(function (err) {
        if (err) {
            res.send("sorry, error has occoured");
            console.log(err);
        } else {
            res.send("successfully registered product and seller details, Happy Selling");
            console.log("seller data saved successfully");
        }
    });
})

/*const firstdata = new forminputs({
    Fname: "deep",
    Lname: "sinha",
    dateofBirth: '2002-12-09',
    Phone: 989234567,
    Email: "bot1@gmail.com",
    Address: "hno-56, mp",
    password: "deep#2002",
    cnfpassword: "deep#2002"
})

firstdata.save();*/

/* sign in system*/

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port||3000, function () {
    console.log("Server has started successfully.");
});