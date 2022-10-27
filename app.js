const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path=require("path");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
const ejs = require("ejs");
app.set('view engine', 'ejs')

const uri = "mongodb+srv://deep:test1234@clustername.mongodb.net/ecom-register-DB?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const url = "mongodb+srv://deep:test1234@testcluster.dqxwptd.mongodb.net/ecomDb?retryWrites=true&w=majority";

mongoose.connect("mongodb+srv://deep:test1234@testcluster.dqxwptd.mongodb.net/ecomDb?retryWrites=true&w=majority", function (err) {
    if (err) {
        console.log("connection error");
        console.log(err);
    } else {
        console.log("successfully connected to your MongoDB database.");
    }
});

const itemSchema = new mongoose.Schema ({
    Seller_Name:String,
    Product_Name:String,
    Product_description:String,
    Product_Category:String,
    Product_quantity:Number,
    Product_price:Number,
    Selling_price:Number,
    Phone:Number,
    Email:String,
    Address:String,
    First_img:String,
    Second_img:String,
    Third_img:String,
    Fourth_img:String,
    Fifth_img:String
 });
 const productinputs = new mongoose.model ("productinputs", itemSchema);
 module.exports = mongoose.model('ecomDB', itemSchema,  "productinputs")
app.get('/post/:anything', (req, res) => {
    const reqTitle= req.params.anything;
   productinputs.find({ _id:reqTitle}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log("First function call : ", docs);
        }
      
        res.render("product",{Title:docs});
    });
});

app.get("/",function(req,res){
   res.sendFile(path.join(__dirname+"/Pages/homePage.html"));
});

app.get("/category",function(req,res){
    res.sendFile(path.join(__dirname+"/Pages/category.html"));
 });
 
app.listen(3000, function () {
    console.log("server started on the port 3000");
  });
  