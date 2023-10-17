const express = require('express'); 
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const { config } = require("dotenv");
const routers = require('./routes/loginRoutes')
const cors = require('cors');

const server = express();
const env = config();
server.use(cors());
server.use(express.json());
const BrRouter =routers.routers;

const tokenObject = {
    name:"bharat",
    age:22,
}

server.use("/",BrRouter)

// ,(req,res)=>{
//    let token = jwt.sign(
//         { userId: 123,name:"aman" },
//         "secretkeyappearshere",
//         {expiresIn : '24h'}
//       );
//     try{
//       res.status(200).send(token);
//     }
//     catch (err) {
//       console.log("Errrorrrr")
//         const error = new Error("Error! Something went wrong.");
//         res.status(400).send("Errrorrrr");
//       }
   
//     res.end();
// }


// server.post("/user",(req,res)=>{
//   let headertoken = req.headers;
//   const tokenkey = req.header("secretkeyappearshere");
//   var abc = headertoken.authorization;
//   console.log(abc);
  
//   //const verifyed = jwt.verify(abc,"secretkeyappearshere")
//    var decode = jwt.verify(abc, "secretkeyappearshere");
// res.json({
//   login: true,
//   aman: "truefalse",
//   data: decode,
//   });
//   // if(verifyed){
//   //   console.log("verifyed")
//   // }
  
//    res.end();
// })

console.log(process.env.Db_String,"Db_String");
async function main() {
  await mongoose.connect(process.env.Db_String);
  try{
      console.log('database connected')
  }
  catch(error){
      console.log(error);
  }

}
main();


server.listen(8888,()=>{
    console.log("connect")
})

console.log("Hii");