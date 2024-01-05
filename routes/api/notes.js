const { GetNoteById, GetAllNotes, CreateNewNote, UpdateExistingNote, DeleteNote, ShareNoteWithAnotherUser } = require('../../controllers/notes');

const route = require('express').Router();

// GET ALL NOTES
route.get("/", GetAllNotes);

// GET NOTES BY ID
route.get("/:id", GetNoteById);

// POST Create New Note for the authenticated User
route.post("/", CreateNewNote);

// Update an existing Note
route.put("/:id", UpdateExistingNote);

// Delete a particular note
route.delete("/:id", DeleteNote);

// share a note with another user
route.post("/:id/:share", ShareNoteWithAnotherUser);


module.exports = route;