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

router.delete("/",function(req,res,next) {
		let requestBody = req.body,
			userAll = new UserModel(),
		  	userid = requestBody.userid;
			userAll.deleteByUserId(userid);
			res.status(200).json(`User ${userid} Deleted!!!`);	
});
module.exports = router;
