const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const port = 7900;

const userModel = require("./mongodb");
const templatePath = path.join(__dirname, "./templates");

app.use(express.json());
app.set('view engine',"ejs");
app.set('views',templatePath);
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render("first")
});

app.post("/submission",async (req,res)=>{
    const  { firstName, lastName, mobileNo, emailId, street, city, state, country, loginId, password }  = req.body;
    
    const users = new userModel({
        firstName,
        lastName,
        mobileNo,
        emailId,
        address: {
          country,
          state,
          city,
          street
        },
        loginId,
        password
      });

      try{
          await users.save()
          res.status(200).send('data saved in mongodb successfully')
      }catch(error){
        res.status(500).send('some error happens')
      }
});


app.get('/jsondata', async (req,res)=>{
    try{
        const data = await userModel.find();
        res.json(data);
    }catch(error){
        res.status(500).send("error happens")
    }
});

app.get('/displaydata',(req,res)=>{
    res.render("seconnd")
});



app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})