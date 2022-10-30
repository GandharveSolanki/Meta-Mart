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

 const sellerSchema = new mongoose.Schema ({
    Seller_Name:String,
    Logo_link:String,
    Seller_deck:String,
    Phone:Number,
    Email:String,
    Address:String,
    password:String,
    cnfpassword:String
 });

 const formdata = new mongoose.Schema({
    Seller_Name: { type: String, required: true },
    Logo_link: { type: String, required: true },
    Seller_deck: { type: String, required: true },
    Phone: { type: Number, required: "phone number is required", unique: true },
    Email: { type: String, required: "email is required", unique: true },
    Address: { type: String, required: "please enter address" },
    password: { type: String, required: "create password" },
    cnfpassword: { type: String, required: "confirm password" }
});

const forminputs = new mongoose.model("Sellers", formdata);
app.get("/", function (req, res) {
    res.sendFile(__dirname+ "/Seller_login/seller_register.html");
});

app.get("/login", function (req, res) {
    res.sendFile(__dirname + "/Seller_login/login.html");
});

app.post("/", async function (req, res) {
    const seconddata = new forminputs({
        Seller_Name: req.body.full_name,
        Logo_link: req.body.seller_image,
        Seller_deck: req.body.Seller_description,
        Phone: req.body.mobile_no,
        Email: req.body.email,
        Address: req.body.address,
        password: req.body.cust_password,
        cnfpassword: req.body.cust_password_repeat
    });
    let pwd1 = req.body.cust_password;
    let pwd2 = req.body.cust_password_repeat;
    //checking passwords
    if (pwd1 === pwd2) {
        await seconddata.save(function (err) {
            if (err) {
                var errmes = "Oh no! error has occoured : Email or phone number already registered, go back and try again with different credentials"
                res.render("signin_failed", { errmessage: errmes })
                console.log(err);
            } else {
                res.render("signin");
                console.log("user data saved successfully");
            }
        });

    }
    else {
        var errmes = "Passwords did not match";
        res.render("signin_failed", { errmessage: errmes })
        console.log("passwords do not match");
    }
})

/* sign in system*/
app.post("/login", async function (req, res) {
    try {
        const email = req.body.email;
        const password = req.body.cust_password;
        const usermail = await forminputs.findOne({ Email: email });
        var id = usermail._id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
        if (usermail.password === password) {
            res.render("signin_success", { userid: id })
            /*res.send("<h2>you are signed in, your unique user ID is : " + id+"</h2>");*/
        } else {
            var errmes = "Sign-in failed. (invalid credentials!). You can go back and try again."
            res.render("signin_failed", { errmessage: errmes })
            /*res.send("Oops! invalid credentials,go back and try again");*/
        }

    } catch (error) {
        console.log(error);
        res.send("looks like you are not registered yet");
    }
});

/*data fetching system*/

const userschema = {
    Seller_Name: String,
    Phone: Number,
    Email: String,
    Address: String,
    password: String,
    cnfpassword: String
}

const receiver = mongoose.model("Datainputs", userschema);

app.get("/userdata/:id", function (req, res) {
    console.log(req.params.id)
    receiver.findById(req.params.id, function (err, user) {
        if (err) {
            res.render("signin_failed");
            /*console.log(err);*/
        } else {
            /*console.log(user);*/
            res.render("user-data", { users: user });
        }
    });
});

//  const productinputs = new mongoose.model ("productinputs", itemSchema);

//  module.exports = mongoose.model('ecomDB', itemSchema,  "productinputs")

const productinputs = mongoose.model("productinputs", itemSchema);
const sellers = mongoose.model('sellers', sellerSchema);
  
// Exporting our model objects
module.exports = {
   productinputs,sellers
}

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




app.post("/signthis",function(req,res){
    const title=String(req.body.uid);
    sellers.find({ _id:title}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
           // console.log("First function call : ", docs);
        }
      
      docs.forEach(function(ele){
       sellerName=ele.Seller_Name;
      });
      productinputs.find({ Seller_Name:sellerName}, function (err, sellerinfoarray) {
        if (err){
            console.log(err);
        }
        else{
            console.log("First function call : ", sellerinfoarray);
        }
       res.render("sellerPage",{sellerarray:sellerinfoarray});
      
    });
    });
})


// app.get("/",function(req,res){
//    res.sendFile(path.join(__dirname+"/Pages/homePage.html"));
// });

app.get("/category",function(req,res){
    res.sendFile(path.join(__dirname+"/Pages/category.html"));
 });

app.get("/seller",function(req,res){
    // res.sendFile(path.join(__dirname+""));
    res.render("sellerPage");
 });
 



// server port
app.listen(3000, function () {
    console.log("server started on the port 3000");
  });
  