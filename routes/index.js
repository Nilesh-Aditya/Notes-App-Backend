const route = require('express').Router();
const { ValidateUserEmail } = require('../middlewares/auth');

route.use('/auth', require('./api/auth'));
route.use('/notes', ValidateUserEmail, require('./api/notes'));
route.use('/search', ValidateUserEmail, require('./api/search'));

module.exports = route;