const express = require("express");
const router = express.Router();
const Notes = require("../modules/Notes");
const fetchUser=require('../middleware/fetchUser');
const { body, validationResult } = require("express-validator");
// fetching all notes of user 

router.get("/Allnotes",fetchUser,async (req,res)=>{
    try {
        let notes= await Notes.find({user:req.user.id});
        res.json(notes)
    } catch (error) {
        console.log(error)
        res.status(500).send("internal error occured") 
    } 
})

// create new note of user
router.post('/Newnote',fetchUser,[
    body("Title", "enter a valid title").isLength({ min: 3 }),
    body("discription", "enter a valid discription").isLength({ min: 5 }),
],async (req,res)=>{
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let {Title,discription,tag}=req.body;
    let note=await Notes.create({
        Title,discription,tag,user:req.user.id,
    })
    res.json(note)
} catch (error) {
    console.log(error)
        res.status(500).send("internal server error")
}
})

// updating a note for user
router.put('/updateNote/:id',fetchUser, async (req,res)=>{
    try {
        const {Title,discription,tag}=req.body;
        const newNote={};
        if(Title){newNote.Title=Title}
        if(discription){newNote.discription=discription}
        if(tag){newNote.tag=tag}
        let notes= await Notes.findById(req.params.id);
        console.log(notes)
        if(!notes){return res.status(404).send("Not found")}
        if(notes.user.toString()!==req.user.id){
            return res.status(401).send("Not allowed");
        }
        notes= await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
        res.json(notes)
    } catch (error) {
        console.log(error);
        res.status(400).send({error:"internal server error"})
    }
})

// deleting a note
router.delete('/deleteNote/:id',fetchUser, async (req,res)=>{
    try {
        
        let notes= await Notes.findById(req.params.id);
        console.log(notes)
        if(!notes){return res.status(404).send("Not found")}
        if(notes.user.toString()!==req.user.id){
            return res.status(401).send("Not allowed");
        }
        notes= await Notes.findByIdAndDelete(req.params.id)
        res.json({"success":"note has been deleted"})
    } catch (error) {
        console.log(error);
        res.status(400).send({error:"internal server error"})
    }
}) 

module.exports= router