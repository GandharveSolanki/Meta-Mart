const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const ejs = require("ejs");
app.set('view engine', 'ejs')

const url = "mongodb+srv://deep:test1234@testcluster.dqxwptd.mongodb.net/ecomDb?retryWrites=true&w=majority";

mongoose.connect("mongodb+srv://deep:test1234@testcluster.dqxwptd.mongodb.net/ecomDb?retryWrites=true&w=majority", function (err) {
    if (err) {
        console.log("connection error");
        console.log(err);
        mongoose.disconnect();
    } else {
        console.log("successfully connected to your MongoDB database.");
    }
});


app.use(express.static('public'));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/seller_register.html");
});

app.get("/login", function (req, res) {
    res.sendFile(__dirname + "/login.html");
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


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port || 3000, function () {
    console.log("Server has started successfully.");
});