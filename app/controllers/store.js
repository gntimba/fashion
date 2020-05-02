var models = require('../../models');
const Op = require('sequelize').Op;
const Sequelize = require('sequelize')
const config = require("../../config/config.json")
var sequelize = new Sequelize(config.development);
var store = models.designerStore;

exports.createStore = function (req, res) {

    store.create({
        category: req.body.cat,
        active: false,
        brandName: req.body.brand,
        user_id: req.user.id,
        logo: "default.jpg",
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        address: req.body.address
    }).then(function (status) {
        //console.log(user)
        res.status(201).json({ "message": "Account Created Successfully", "code": 201 })
    }).catch(function (err) {
        console.log(err)
        res.status(500).json({ "message": "Something went bad", "code": 500 })
    })
}
exports.allStore = function (req, res) {
    store.findAll({
        where: { "user_id": req.user.id, "active": true }
    }).then(function (stores) {
        console.log(stores)
        if (stores.length == 0)
            res.status(404).json({ "message": "U have no stores", "code": 404 })
        else {
            res.status(200).json(stores)
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
            id: req.body.id,
            user_id: req.user.id
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
exports.getItems = async function (req, res) {
  let query = `SELECT id, category,brandName,user_id,logo,
       latitude, longitude, distance
    FROM (
    SELECT z.id,
        z.category,
        z.brandName,
        z.user_id,
        z.logo,
        z.latitude, z.longitude,
        p.radius,
        p.distance_unit * DEGREES(ACOS(LEAST(1.0, COS(RADIANS(p.latpoint))* COS(RADIANS(z.latitude))* COS(RADIANS(p.longpoint - z.longitude))+ SIN(RADIANS(p.latpoint)) * SIN(RADIANS(z.latitude))))) AS distance
    FROM designerStores AS z
    JOIN (   /* these are the query parameters */
        SELECT  ${req.body.latitude}  AS latpoint,  ${req.body.longitude} AS longpoint,
                50.0 AS radius,      111.045 AS distance_unit
    ) AS p ON 1=1
    WHERE z.latitude
     BETWEEN p.latpoint  - (p.radius / p.distance_unit)
         AND p.latpoint  + (p.radius / p.distance_unit)
    AND z.longitude
     BETWEEN p.longpoint - (p.radius / (p.distance_unit * COS(RADIANS(p.latpoint))))
         AND p.longpoint + (p.radius / (p.distance_unit * COS(RADIANS(p.latpoint))))
    ) AS d
    WHERE distance <= radius
    ORDER BY distance
    LIMIT 15`
try {
    const [results, metadata] = await sequelize.query(query);

    res.status(200).json(results)
} catch (error) {
    console.error(error)
    res.status(500).json({ "message": "error", "code": 400 })
}
  

}
