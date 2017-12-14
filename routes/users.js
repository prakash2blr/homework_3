"use strict";
const express = require('express');
const router = express.Router();
const UserModel = require('../models/usermodel.js')

router.get('/', function(req, res, next) {
  				let userAll = new UserModel(),
				userDetails = userAll.allUsers();
				userDetails.then(function(resultDb){
					let result=JSON.parse(resultDb);
					res.render('index',{"result":result});
				});
});

router.get('/add', function(req, res, next) {
	res.render('add',{});
});

router.post("/",function(req,res,next) {
	let requestBody = req.body,
		name = requestBody.name,
		email = requestBody.email,
		title = requestBody.title,
		empcode = requestBody.empcode,
		phone = requestBody.phone,
		userObj={
			"name":name,
			"email":email,
			"job_title":title,
			"employee_code":empcode,
			"phone":phone
		},
		userAll = new UserModel(),

		userDetails = userAll.createUser(userObj);
		userDetails.then(function(resultDb){
			res.status(200).json("User Created!!");
		});
	
});

router.get('/:id', function(req, res, next) {
  	let requestBody = req.params,
  		userid = requestBody.id,
  		userAll = new UserModel(),
  		userDetails = userAll.getUserById(userid);
		userDetails.then(function(resultDb){
			let result=JSON.parse(resultDb);
			res.render('edit',{"result":result});
		});
});

router.put("/",function(req,res,next) {
		let requestBody = req.body,
		  	userAll,
		  	userDetails,
		  	userid = requestBody.userid,
		  	name = requestBody.name,
			email = requestBody.email,
			title = requestBody.title,
			empcode = requestBody.empcode,
			phone = requestBody.phone,
			userObj={
				"name":name,
				"email":email,
				"job_title":title,
				"employee_code":empcode,
				"phone":phone
			};
			userAll = new UserModel();
			userDetails=userAll.updateByUserId(userObj,userid);
			userDetails.then(function(resultDb){
				res.status(200).json(`User ${userid} updated!!!`);	
			});
});

router.delete("/",function(req,res,next) {
		let requestBody = req.body,
			userAll = new UserModel(),
			userDetails,
		  	userid = requestBody.userid;
			userDetails=userAll.deleteByUserId(userid);
			userDetails.then(function(resultDb){
				res.status(200).json(`User ${userid} Deleted!!!`);	
			});							
});
module.exports = router;
