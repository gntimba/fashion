var numeral = require('numeral');
var bcrypt = require('bcrypt');
var dateFormat = require('dateformat');
var models = require('../../models');
var User = models.user;
var Webtoken = models.token
var jwt = require('jsonwebtoken');
var transact = require('../util/transact');
const Op = require('sequelize').Op;

exports.signup = function (req, res) {
	let data = req.body
	//	console.log(data)
	User.findAll({
		where: { "mail": req.body.mail }
	}).then(function (results) {
		if (!results.length == 0)
			res.status(409).json({ "message": "That email is already taken", "code": 409 })
		else {
			const saltRounds = 10;
			var salt = bcrypt.genSaltSync(saltRounds);
			var hash = bcrypt.hashSync(req.body.password, salt);
			User.create({
				mail: req.body.mail,
				active: true,
				active_hash: hash,
				lastName: req.body.lastName,
				firstName: req.body.firstName,
				picture: "default.jpg",
				dob: req.body.dob,
				phoneNumber: req.body.phoneNumber
			}).then(function (user) {
				//console.log(user)
				res.status(201).json({ "message": "Account Created Successfully", "code": 201 })
			})
		}
	}).catch(function (err) {
		res.status(500).json({ "message": "Something went bad", "code": 500 })
	})
}
exports.users = function (req, res) {




	User.findAll({
		where: { "id": req.user.id },
		limit: 1
	}).then(function (user) {
		if (user.length == 0 || !user[0].active)
			res.status(404).json({ "message": "Account Does Not Exist", "code": 404 })
		else {
			let data = {
				"role_id": user[0].role_id,
				"_id": user[0]._id,
				"dob": user[0].dob,
				"lastName": user[0].lastName,
				"firstName": user[0].firstName,
				"picture": "http://localhost:8042/pro/" + user[0].picture,
				"created_date": user[0].created_date,
				"mail": user[0].mail,
				phoneNumber: user[0].phoneNumber,
				address: user[0].address,
				city: user[0].city,
				postal: user[0].postal,
				suburb: user[0].suburb,
			}
			res.json(data)
		}

	}).catch(function (err) {
		res.status(500).json({ "message": "Something went bad", "code": 500 })
	})




	//console.log(req.user)

}
exports.logout = function (req, res, next) {
	let tokenReq = req.headers.authorization.replace('Bearer ', '')
	Webtoken.update({
		active: false,
	}, {
		where: {
			token: {
				[Op.eq]: tokenReq
			}
		}
	}).then(function (rowsUpdated) {
		if (rowsUpdated[0] > 0) {
			res.status(200).json({ "message": "logout success", "code": 201 })
		} else
			res.status(400).json({ "message": "token not available", "code": 400 })

	}).catch((err) => {
		res.status(500).json(err)
	})
}
exports.update = function (req, res) {

	User.update({
		address: req.body.address,
		city: req.body.city,
		dob: req.body.dob,
		phoneNumber: req.body.phoneNumber,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		postal: req.body.postal,
		suburb: req.body.suburb
	}, {
		where: {
			id: {
				[Op.eq]: req.user.id
			}
		}
	}).then(function (rowsUpdated) {
		if (rowsUpdated[0] > 0) {
			res.status(200).json({ "message": "Profile Updated", "code": 201 })
		} else
			res.status(400).json({ "message": "User not Updated", "code": 400 })

	}).catch((err) => {
		res.status(500).json(err)
	})

}

exports.login = function (req, res) {
	User.findAll({
		where: { "mail": req.body.mail },
		limit: 1
	}).then(function (results) {
		if (results.length > 0) {
			//console.log(results)
			bcrypt.compare(req.body.password, results[0].active_hash).then(isMatch => {
				if (isMatch) {
					let payload = {
						id: results[0].id,
						role: results[0].role_id
					}
					var token = jwt.sign(payload, process.env.secret, { expiresIn: 6000 * 5 }); //made it that the token expires in 5 minutes

					Webtoken.create({
						token: token,
						user_ID: results[0].id
					}).then(function (user) {
						//console.log(user)
						res.json({ id: payload.id, message: "ok", token: token, code: 200 })
					})



				} else
					res.status(401).json({ "message": "Password is wrong", "code": 401 })
			})
		}

	}).catch(function (err) {
		res.status(500).json({ "message": "Something went bad", "code": 500 })
	})

}



