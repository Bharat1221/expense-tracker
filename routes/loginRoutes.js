const express = require("express");
const authController = require("../endpoints/login/loginController");
const router = express();
const expense = require("../endpoints/expenseData/expenseController");

// .get('/userdata',authController.Allusers)
// .get('/userdata/:id',authController.UserbyId)
// // .get('/:id',(req,res)=>{
// //     const id = req.params;
// //     console.log(id);
// //     res.end(id.id);
// // })

router
.get('/allusers',authController.Allusers)
.post('/createuser',authController.CreateUser)
.post('/login',authController.login)
.post('/update',authController.updateUser)
.post('/createexpense',expense.CreateExpense)
.post('/updateexpense/:id',expense.UpdateExpense)
.post('/updateexpense',expense.UpdateExpense)
.post('/deleteexpense',expense.DeleteExpense)
.post('/userexpense',expense.UserExpenses)
.post('/monthlyexpense',expense.MonthlyExpense)
.post('/monthlyexpense/:id',expense.ByDateExpenses)

exports.routers=router;
