const Note = require("../models/notes");
const { userAuth: User } = require("../models/auth");
const mongoose = require('mongoose');

async function GetAllNotes (req, res, next) {
    try {
        const Notes = await Note.find({
            $or: [
                { author: mongoose.Types.ObjectId(req.user_id) },
                { sharedWith: mongoose.Types.ObjectId(req.user_id) }
            ]
        })
        .populate('author')
        .populate('sharedWith');

        return res.status(200).json({ Notes });
    }
    catch (error) {
        console.error('Error fetching notes:', error);
        return res.status(500).json({ error });
    }
}

async function GetNoteById (req, res, next) {
    let NoteId = req.params.id;
    try {
        const note = await Note.findById(NoteId);
        if(!note){
            return res.status(404).json({ msg: 'Note not Found '});
        }
        return res.status(200).json({ Note: note });
    } 
    catch (error) {
        return res.status(500).json({ error });
    }
}

async function CreateNewNote (req, res, next) {
    let { title, content } = req.body;
    try {
        let newNote = await Note.create({
            title,
            content,
            author: req.user_id
        });
        return res.status(200).json({ msg: "Note has been added successfully" });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

async function UpdateExistingNote (req, res, next) {
    const { title, content } = req.body;
    let NewValue = {};
    if(title){
        NewValue.title = title;
    }
    if(content){
        NewValue.content = content;
    }

    try {
        const res = await Note.updateOne({ _id: req.params.id }, { $set: NewValue });
        if(!res.modifiedCount){
            return res.status(404).json({ error: "Unable To Update the Note" });
        }
        return res.status(200).json({ msg: 'Note Update Successfully' });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}

async function DeleteNote (req, res, next) {
    try {
        const note = await Note.findById(req.params.id)

        if(!note){
            return res.status(400).json({ msg: 'Note not found' })
        }
        //Check on user
        if(note.author.toString() !== req.user_id){
            return res.status(401).json({ msg: 'User not Authorised' })
        }

        await note.remove()

        return res.json({ msg: 'Note removed' })
    } 
    catch (error) {
        return res.status(500).json({ error });
    }
}

async function ShareNoteWithAnotherUser (req, res, next) {
    const SecondUser = req.params.share;
    const NoteId = req.params.id;

    try {
        const Notes = await Note.findById(NoteId);
        if(!Notes){
            return res.status(400).json({ msg: 'Note not found' })
        }
        const user = await User.findById(SecondUser);
        if(!user){
            return res.status(400).json({ msg: 'User Does Not Exist' });
        }
        await Notes.sharedWith.unshift(secondUser);
        await Notes.save();

        res.status(200).json({ Notes });
    } 
    catch (error) {
        res.status(500).json({ error });
    }

}

module.exports = {
    GetAllNotes,
    GetNoteById,
    CreateNewNote,
    UpdateExistingNote,
    DeleteNote,
    ShareNoteWithAnotherUser
}