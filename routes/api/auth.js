const route = require('express').Router();
const { check, validationResult } = require('express-validator')
const { RegisterNewUser, UserLogin } = require("../../controllers/auth");


route.post("/signup", [
    check('name','Field is Required').not().isEmpty(),
    check('email','Field is Required').isEmail(),
    check('password','Password must be of at least of 6 characters').isLength({min:6})
], RegisterNewUser);

route.post("/login", [
    check('email','email is required').isEmail(),
    check('password','Password required').exists()
], UserLogin);

module.exports = route;