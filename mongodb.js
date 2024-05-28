const mongoose = require("mongoose");
const validator = require("validator");


mongoose.connect("mongodb://localhost:27017/assign")
.then(()=>{
    console.log("connected successfully")
})
.catch((err)=>{
    console.error(err)
});


const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required:[true,"this field is mandatory"],
    },
    lastName:{
        type: String,
        required:[true,"this field is mandatory"],
    },
    mobileNo:{
        type: Number,
        required:[true,"this field is mandatory"],
        minLength:1,
        maxLength:10
    },
    emailId:{
        type: String,
        required:[true,"this field is mandatory"],
        validate: [validator.isEmail,"invalid email"]
    },
    address:{
        street: {type:String,required:true},
        city: {type:String,required:true},
        state: {type:String,required:true},
        country: {type:String,required:true},
    },
    loginId:{
        type: String,
        required:[true,"this field is mandatory"],
        minLength:8,
        validate: [/[a-zA-Z0-9]/,"invalid login id"]
    },
    password:{
        type: String,
        required:[true,"this field is mandatory"],
        minLength:6,
        validate: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/,"invalid password"]
    }
},{timestamps:true});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;