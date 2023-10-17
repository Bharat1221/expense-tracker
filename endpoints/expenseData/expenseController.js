const expenses = require("./expenseModel");
const Users = expenses.expenseData;
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const { default: mongoose } = require("mongoose");
// const date = require('date-and-time')

const env = config();
const secretKey = process.env.JWT_SECRET_KEY;



const now  =  Date.now();
const currentDate = new Date();

// Set the time to 1 AM (01:00:00.000)
currentDate.setHours(0, 0, 0, 0);

// Get the timestamp (in milliseconds) for today's date at 1 AM
var todayDate = currentDate.getTime();

console.log("Timestamp for today's date at 1 AM:", todayDate);





exports.DeleteExpense = async (req, res) => {
  var data = req.body;
  console.log(data.id);
  console.log(JSON.stringify(req.body));
  
  const userExpenseparticularDate = await Users.find({ "id":`${data.id}` });
  console.log(userExpenseparticularDate.toString(),"userExpenseparticularDate");
    
  console.log("created Done");
  var itemName = data.expenseData[0].name;
  var itemAmount = data.expenseData[0].amount;
  var newexpensedata=
    {
        time:now,
        itemName:`${itemName}`,
        itemAmount:`${itemAmount}`
    }
   
  // var itemArray =  data.expensedata.push(newexpensedata);
  const updateDocument = {
    $push: {
      "expensedata": newexpensedata,
    },
  };
  // const NewexpenseData = new Users({
  //     date:now,
  //     id:`${data.id}`,
  //     expensedata:[
  //         {
  //             time:now,
  //             itemName:`${itemName}`,
  //             itemAmount:`${itemAmount}`
  //         }
  //     ]
  //   })
  //   NewexpenseData.save();
  await Users.updateOne({
    $and: [
      { "id": data.id },
      { "date": todayDate }
    ]
  },{$pull:{"expensedata":{"itemName":`${itemName}`}}})
    res.send(newexpensedata);
    console.log("Dele Done Successfully");


  res.end();

};


// exports.UpdateExpense = async (req, res) => {
//   var data = req.body;
//   console.log(data.expenseData[0].time);
//   console.log(JSON.stringify(req.body));
  
//   // const userExpenseparticularDate = await Users.find({ "id":`${data.id}` });
//   // console.log(userExpenseparticularDate.toString(),"userExpenseparticularDate");
    
//   console.log("created Done");
//   var createdTime = data.expenseData[0].time;
//   var itemName = data.expenseData[0].name;
//   var itemAmount = data.expenseData[0].amount;
//   var newitemName = data.newExpenseData[0].name;
//   var newitemAmount = data.newExpenseData[0].amount;
//   // var newexpensedata=
//   //   {
//   //       time:now,
//   //       itemName:`${itemName}`,
//   //       itemAmount:`${itemAmount}`
//   //   }
   
//   // // var itemArray =  data.expensedata.push(newexpensedata);
//   // const updateDocument = {
//   //   $push: {
//   //     "expensedata": newexpensedata,
//   //   },
//   // };
//   // const NewexpenseData = new Users({
//   //     date:now,
//   //     id:`${data.id}`,
//   //     expensedata:[
//   //         {
//   //             time:now,
//   //             itemName:`${itemName}`,
//   //             itemAmount:`${itemAmount}`
//   //         }
//   //     ]
//   //   })
//   //   NewexpenseData.save();
//   await Users.updateOne({
//     $and: [
//       { "id": data.id },
//       { "date": todayDate }
//     ]
//   },{$pull:{"expensedata":{ $and: [
//     { "time": createdTime },
//     { "itemName": `${itemName}` }
//   ]}}})

//   var newexpensedata={
//     time:createdTime,
//     itemName:`${newitemName}`,
//     itemAmount:`${newitemAmount}`
// }
// const updateDocument = {
//   $push: {
//     "expensedata": newexpensedata,
//   },
// };
// //   Users.updateOne({"id":`${id}`},{$push:{"expensedata":{NewexpenseData}}})
// await Users.updateOne({
//   $and: [
//     { "id": data.id },
//     { "date": todayDate }
//   ]
// },updateDocument);
  
//   console.log("dta delete")
// //   var newexpensedata={
// //     time:createdTime,
// //     itemName:`${itemName}`,
// //     itemAmount:`${itemAmount}`
// // }
// // const updateDocument = {
// //   $push: {
// //     "expensedata": newexpensedata,
// //   },
// // };
// //   Users.updateOne({"id":`${id}`},{$push:{"expensedata":{NewexpenseData}}})
// // await Users.updateOne({
// //   $and: [
// //     { "id": data.id },
// //     { "date": todayDate }
// //   ]
// // },updateDocument);
//   // console.log(now,"Update Done");


//   // var adb = await Users.updateOne({ expensedata: { $elemMatch: { time: createdTime } } },{$set:{"expensedata":{"itemName":`${itemName}`,"itemAmount":`${itemAmount}`,"time":createdTime}}})
//     // res.send(newexpensedata);
//     // console.log( adb,"Update Done Successfully");


//   res.end();

// };


exports.CreateExpense = async (req, res) => {
  var data = req.body;
  console.log("Hiiii there",data.id);
  console.log("Hiiii now",now);
  console.log(JSON.stringify(req.body));
  var itemName = data.expenseData[0].name;
  var itemAmount = data.expenseData[0].amount;
  const userExpenseparticularId = await Users.find({"id":data.id});
  const userExpenseparticularDate = await Users.find({"date":todayDate});
  const abc = await Users.find({
    $and: [
      { "id": data.id },
      { "date": todayDate }
    ]
  });
  console.log(abc,"abc abc abc abc");
  // console.log(userExpenseparticularDate.toString(),"userExpenseparticularDate");


    
  if(abc.length<1){
    console.log("created Done");
    
    const NewexpenseData = new Users({
        date:todayDate,
        id:`${data.id}`,
        expensedata:[
            {
                time:now,
                itemName:`${itemName}`,
                itemAmount:`${itemAmount}`
            }
        ]
      })
      await  NewexpenseData.save();
      res.send([{ message: "Added SuccessFully" }]);
      console.log(now);
  }
  else{
    console.log("Update Done");
    var newexpensedata={
        time:now,
        itemName:`${itemName}`,
        itemAmount:`${itemAmount}`
    }
    const updateDocument = {
      $push: {
        "expensedata": newexpensedata,
      },
    };
    //   Users.updateOne({"id":`${id}`},{$push:{"expensedata":{NewexpenseData}}})
    await Users.updateOne({
      $and: [
        { "id": data.id },
        { "date": todayDate }
      ]
    },updateDocument);
      console.log(now,"Update Done");
  }
  
  res.end();

};

exports.UserExpenses = async (req, res) => {
  var data = req.body;
  var datahead = req.params;
  console.log(data,"data data");
  console.log(datahead);
  console.log(JSON.stringify(req.body));
  
  const abc = await Users.find({
    $and: [
      { "id": data.id },
      { "date": todayDate }
    ]
  });
 
   console.log(todayDate,"todayDate");
  res.send(abc);
  res.end();

};

exports.MonthlyExpense = async (req, res) => {
  var data = req.body;
  var datahead = req.params;
  console.log(data,"data data");
  console.log(datahead);
  console.log(JSON.stringify(req.body));
  
  // const abc = await Users.find({$and: [{ "date": { $gte: 1695839400000 } },{ "id": data.id }]},{$and: [{ "date": { $lte: 1695945600000 } },{ "id": data.id }]}
  const abc = await Users.find({$and:[{ "id": data.id },{ "date": { $gte: data.startdate,$lte: data.enddate  }}]},{_id:0,__v:0,id:0});
 
   
  res.send(abc);
  res.end();

};

exports.ByDateExpenses = async (req, res) => {
  var data = req.body;
  var url = req.originalUrl.split("/");
  var datahead = req.params;
  console.log(data,"data data");
  console.log(datahead);
  console.log(url[2],"url");
  console.log(JSON.stringify(req.body));
  const exactDate = url[2];
  
  const abc = await Users.find({
    $and: [
      { "id": data.id },
      { "date": exactDate }
    ]
  });
 
   
  res.send(abc);
  res.end();

};

exports.UpdateExpense = async (req, res) => {
  var data = req.body;
  var url = req.url;
  const exactDate = url[2];
  console.log(exactDate,"exactDate")
  console.log(url,"url")
  console.log(data.expenseData[0].time);
  console.log(JSON.stringify(req.body));
  console.log("created Done");
  var createdTime = data.expenseData[0].time;
  var itemName = data.expenseData[0].name;
  var itemAmount = data.expenseData[0].amount;
  var newitemName = data.newExpenseData[0].name;
  var newitemAmount = data.newExpenseData[0].amount;
  var userDate = data.userdate;
  if(userDate!=undefined){
    todayDate=userDate;
  }
  console.log(createdTime,"createdTime")
  // if(exactDate!=undefined){
  //   todayDate = parseInt(exactDate.id);
  // }
 
  
  await Users.updateOne({
    $and: [
      { "id": data.id },
      { "date": todayDate }
    ]
  },{$pull:{"expensedata":{ $and: [
    { "time": createdTime },
    { "itemName": `${itemName}` }
  ]}}})

  var newexpensedata={
    time:createdTime,
    itemName:`${newitemName}`,
    itemAmount:`${newitemAmount}`
}
const updateDocument = {
  $push: {
    "expensedata": newexpensedata,
  },
};
//   Users.updateOne({"id":`${id}`},{$push:{"expensedata":{NewexpenseData}}})
await Users.updateOne({
  $and: [
    { "id": data.id },
    { "date": todayDate }
  ]
},updateDocument);
  
  console.log("dta delete")


  res.end();

};


