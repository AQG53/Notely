import express from "express";
import {getAllNotes, getNote, createNotes, updateNotes, deleteNotes} from "../controllers/notesController.js"

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNote);
router.post("/", createNotes);
router.put("/:id", updateNotes); //localhost:5001/api/notes/21 -> id of the note to update
router.delete("/:id", deleteNotes);

export default router;
