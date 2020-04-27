var numeral = require('numeral');
var bcrypt = require('bcrypt');
var dateFormat = require('dateformat');
var models = require('../../models');
var User = models.user;
var Webtoken = models.token
var jwt = require('jsonwebtoken');
const Op = require('sequelize').Op;
var store = models.designerstore;
var item = models.item;

exports.createStore = function (req, res) {

    store.create({
        category: req.body.cat,
        active: false,
        brandName: req.body.brand,
        user_id: req.user.id,
        logo: "default.jpg",
        address: req.body.address
    }).then(function (status) {
        //console.log(user)
        res.status(201).json({ "message": "Account Created Successfully", "code": 201 })
    }).catch(function (err) {
        res.status(500).json({ "message": "Something went bad", "code": 500 })
    })
}
exports.allStore = function (req, res) {
    store.findAll({
        where: { "id": req.user.id, "active": true },
        limit: 1
    }).then(function (store) {
        if (store.length == 0)
            res.status(404).json({ "message": "U have no stores", "code": 404 })
        else {
            res.json(store[0])
        }

    }).catch(function (err) {
        res.status(500).json({ "message": "Something went bad", "code": 500 })
    })
}


exports.update = function (req, res) {

    store.update({
        brandName: req.body.brand,
        address: req.body.address
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
