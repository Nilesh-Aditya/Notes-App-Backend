const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    sharedWith: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
  },
  { timestamps: true }
);

// Text index for search functionality
noteSchema.index({ title: "text", content: "text" });

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
