const note = require('express').Router();
const fs = require('fs');
const path = require('path');

const rawData = fs.readFileSync(path.join(__dirname, '../db/db.json'))
const notes = JSON.parse(rawData);

let idNumber = 0;

// api/notes
note.post('/', (req,res) => {
    const { id, title, text } = req.body;
        id++;
    const newNotes = {
        id,
        title,
        text
    }

    fs.appendFileSync(path.join(__dirname, '../db/db.json'), newNotes, () => {

    })

    res.json();
    
})

note.get('/', (req,res) => {
    res.json(notes);
})

module.exports = note;