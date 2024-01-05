const { SearchNotes } = require('../../controllers/search');
const route = require('express').Router();

route.post("/", SearchNotes);

module.exports = route;