//importing all modules
const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const collection = require("./config");

//create express application
const app = express();
//conver data into jason format
app.use(express.json());
app.use(express.urlencoded({extended: false}))


//use EJS as view engine
app.set('view engine', 'ejs');
//static file
app.use(express.static("public"));

app.get("/", (req,res)=>{
res.render("login");
})

app.get("/signup", (req,res)=>{
res.render("signup");
})


//register user
app.post("/signup", async (req, res) => {
    const data = {
        Username: req.body.username,
        email: req.body.email, 
        password: req.body.password
    }

    // Check if the user already exists in the database
    const existingUser = await collection.findOne({ email: data.email });
    if (existingUser) {
        res.send("User with this email already exists. Choose a different email.");
    } else {
        // Hash the password using bcrypt
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRound);
        data.password = hashedPassword; // Replace the plain password with the hashed password
        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.redirect("/");
    }
});


app.post("/calculate", async(req, res) => {
    res.render("home")
});



//Login User
app.post("/login", async(req, res) =>{
try{
    const check = await collection.findOne({Username: req.body.username});
    if (!check){
        res.send("user name cannot be found");
    }

    //compare the hash password from the database with the plain text
    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
    if (isPasswordMatch){
    res.render("home");
}else{
    res.send("Wrong password");
}

}catch{
    res.send("wrong detail");

}

})



//choose port to run application
const port = 2000;
app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
});
