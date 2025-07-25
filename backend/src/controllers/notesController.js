import Note from "../models/Note.js"

export async function getAllNotes(_,res) {
    try {
        const notes = await Note.find().sort({createdAt:-1}) //-1 means descending. Newest first to be shown
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getAllnotes controller", error)
        res.status(500).json({message:"Internal Server error"})
    }
}

export async function getNote(req,res) {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({message: "Note not found"})
        res.status(200).json(note)
    } catch (error) {
        console.error("Error in getNote controller", error)
        res.status(500).json({message:"Internal Server error"})
    }
}


export async function createNotes(req,res) {
    try {
        const {title, content} = req.body
        const note = new Note({title, content})
        
        const savedNote = await note.save();
        res.status(201).json(savedNote)
    } catch (error) {
        console.error("Error in createNotes controller", error)
        res.status(500).json({message:"Internal Server error"})
    }
}

export async function updateNotes(req,res) {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title, content},
            {
                new: true,
            }
        );

        if(!updatedNote) return res.status(404).json({message: "Note not found"});

        res.status(200).json(updatedNote);
        
    } catch (error) {
        console.error("Error in updateNotes controller", error)
        res.status(500).json({message:"Internal Server error"})
    }
}

export async function deleteNotes(req,res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)

        if(!deletedNote) return res.status(404).json({message: "Note not found"});

        res.status(200).json({message: "Note deleted successfully!"});
    } catch (error) {
        console.error("Error in deleteNotes controller", error)
        res.status(500).json({message:"Internal Server error"})
    }
}

