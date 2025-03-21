const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv =require("dotenv").config();



const app= express()
app.use(cors())
app.use(express.json({ limit: '50mb' }));

const PORT =process.env.PORT || 8080


//mongodb connection

mongoose.set('strictQuery',false);

mongoose.connect(process.env.MONGODB_URL).then(()=>console.log("Connect to Database"))
.catch((err)=>console.log(err))

//schema

const userSchema = mongoose.Schema({
    firstName :String,
    lastName :String ,
    BPLcardNumber :{
        type : String,
        unique : true,
    } ,
    password :String ,
    confirmpassword:String,


});
userSchema.index({ BPLcardNumber: 1 });
//
const userModel = mongoose.model("user",userSchema)




app.get("/",(req,res)=>{
    res.send("Server is running")
})
//sign up
app.post("/signup",async(req,res)=>{
    console.log(req.body)
    const {BPLcardNumber} =req.body;
    try {
        const existingUser = await userModel.findOne({ BPLcardNumber });

        if (existingUser) {
            return res.send({ message: "BPLcardNumber is already registered",alert : false });
        }

        const newUser = new userModel(req.body);
        const savedUser = await newUser.save();
        res.send({ message: "Successfully signed up",alert : true });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send({ message: "Internal server error",error :error.message });
    }
    
});
    
//api login
app.post("/login",async(req,res)=>{
    console.log(req.body)
const {BPLcardNumber, password} =req.body;
try {
    const existingUser = await userModel.findOne({ BPLcardNumber });

    if (existingUser) {
        const storedPassword=existingUser.password;
        if (password === storedPassword) {
        const dataSend ={
            _id:existingUser._id,
  firstName:existingUser.firstName,
  lastName:existingUser.lastName,
  BPLcardNumber:existingUser.BPLcardNumber,

        };
        console.log(dataSend);
        return res.send({ message: "Login is successful",alert : true,data :dataSend });
    }else{
        return res.send({ message: "Incorrect password", alert: false });
    }
    }
    // const newUser = new userModel(req.body);
    // const savedUser = await newUser.save();
    res.send({ message: "User not found",alert : false });
} catch (error) {
    console.error("Error during login:", error);
    
}



});
 //product section

 const schemaProduct = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,

  });

  const productModel = mongoose.model("product",schemaProduct);



  //save product in database


  app.post("/uploadProduct",async(req,res)=>{
    try {
        console.log(req.body);
        const data = await productModel(req.body);
        const datasave = await data.save().catch(error => {
            console.error("Error saving product:", error);
            res.status(500).send({ message: "Error saving product", error: error.message });
        });;
        res.send({ message: "Upload successfully" });
    } catch (error) {
        console.error("Error during product upload:", error);
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
});
//

app.get("/product",async(req,res)=>{
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
})


app.listen(PORT,()=>console.log("server is running at port : " + PORT))



