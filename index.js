//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
let userIsAuthorised = false;

app.use(bodyParser.urlencoded({extended: true}));

function checkPassword(req,res,next){
    const password = "ILoveProgramming";
    if(req.body["password"].toString()=== password){
        userIsAuthorised = true;
    }
    next();
}

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
})


app.post("/check", checkPassword, (req,res) =>{
    if(userIsAuthorised){
        res.sendFile(__dirname + "/public/secret.html");
        userIsAuthorised = false;
    } else{
        res.redirect("/");
    }
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})