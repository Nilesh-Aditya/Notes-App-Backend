const Note = require("../models/notes")

async function SearchNotes (req, res, next) {
    try {        
        let query = req.query.q;
        let notes = await Note.find({ $text: { $search: query } }).limit(10);
        if(!notes){
            return res.status(400).json({ msg: 'Notes Not found' });
        }
    
        return res.status(200).json({ Notes: notes });
    } 
    catch (error) {
        return res.status(500).json({ error });
    }
}

module.exports = {
    SearchNotes
}