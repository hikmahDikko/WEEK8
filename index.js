const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Staff = require("./staffModel");
const dotenv = require("dotenv");
dotenv.config({path : "./config.env"});

const mongoDBUrl = process.env.DB_URL.replace(
    "<password>" ,
    process.env.DB_PASSWORD
);

app.use(express.json());

app.post("/signup", async (req, res) => {
    try{
        const signUp = req.body;
        const signUpDB = new Staff(signUp);
        await signUpDB.save(); 
        return res.status(200).send("success");
    }catch (err){
        res.status(404).send("All fields are required");
        console.log(err);
    }
})

app.put("/signin", async (req, res) => {
    const {email, password} = req.body;
    const signIn = await Staff.findOne({email, password});

    !signIn ? res.status(404).send("Invalid User") : res.status(201).send("successfully signed in");
})

app.patch("/resetp", async (req, res) => {
    try{
        const {fullname, email, password} = req.body;
        const reset = await Staff.findOne({fullname, email});
        reset.password = req.body.password;
        
        reset.save();
        res.status(201).send("Password successfully changed");
    }catch (err) {
        res.status(404).send("Please enter valid inputs");
    }
    
    
})

function serverConnection(){
    try{
        mongoose.connect(mongoDBUrl);
        app.listen(process.env.DB_PORT, () => console.log("Connected to DB"));
    }catch (err){
        console.log(err);
    }
}

serverConnection();