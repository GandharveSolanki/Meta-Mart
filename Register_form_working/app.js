const express = require ('express');
const bodyParser = require("body-parser");
const mongoose = require ('mongoose');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const uri = "mongodb+srv://deep:test1234@clustername.mongodb.net/ecom-register-DB?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const url = "mongodb+srv://deep:test1234@testcluster.dqxwptd.mongodb.net/ecomDb?retryWrites=true&w=majority";

mongoose.connect("mongodb+srv://deep:test1234@testcluster.dqxwptd.mongodb.net/ecomDb?retryWrites=true&w=majority", function(err){
    if (err){
        console.log("connection error");
        console.log(err);
        mongoose.disconnect();
    }else{
        console.log("successfully connected");
    }
});


app.use(express.static('Register_form/public'));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/login", function(req,res){
    res.sendFile(__dirname + "/login.html");
});

const formdata = new mongoose.Schema({
    Fname: {type: String, required: true},
    Lname: String,
    dateofBirth: Date,
    Phone: {type: Number, required: "phone number is required", unique: true},
    Email: {type: String, required: "email is required", unique: true},
    Address: {type: String, required: "please enter address"},
    password: {type: String, required: "create password"},
    cnfpassword: {type: String, required: "confirm password"}
});

const forminputs = new mongoose.model("DataInputs", formdata);

app.post("/", async function(req, res){
    const seconddata = new forminputs({
        Fname: req.body.first_name,
        Lname: req.body.last_name,
        dateofBirth: req.body.date_of_birth,
        Phone: req.body.mobile_no,
        Email: req.body.email,
        Address: req.body.address,
        password: req.body.cust_password,
        cnfpassword: req.body.cust_password_repeat
    });
    let pwd1 = req.body.cust_password;
    let pwd2 = req.body.cust_password_repeat;
    //checking passwords
    if(pwd1 === pwd2){
        await seconddata.save(function(err){
            if(err){
                res.send("sorry, error has occoured : email or phone number already registered, go back and try with different credentials");
                console.log(err);
            }else{
                res.send("successfully registered you, now you can go back and sign in");
                console.log("user data saved successfully");
            }
        });

    }
    else{
        res.send("passwords did not match")
        console.log("passwords do not match");
    }
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
app.post("/login", async function(req,res){
    try {
        const email = req.body.email;
        const password = req.body.cust_password;
        const usermail = await forminputs.findOne({Email: email});
        
        if(usermail.password === password){
            res.send("you are signed in");
        }else{
            res.send("Oops! invalid credentials,go back and try again");
        }
        
    } catch (error) {
        console.log(error);
        res.send("this email is not registered yet go back and register please");
    }
})

let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
}
app.listen(port || 3000, function(){
    console.log("Server has started successfully.");
});