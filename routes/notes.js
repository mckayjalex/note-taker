const note = require('express').Router();
const fs = require('fs');
const path = require('path');
// Gets a unique ID
const { v4: uuid } = require('uuid');

let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
// api/notes GET
note.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
})
// api/notes POST
note.post('/', (req, res) => {
    let { title, text } = req.body;
    const newNotes = {
        id: uuid(),
        title,
        text
    }

    notes.push(newNotes);
    
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes))
    res.json(notes);
})
//  api/notes DELETE
note.delete('/:id', (req, res) => {
    let id = req.params.id;
    notes = notes.filter((val) => {
        let data = val.id != id
        return data;
    });
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
})

module.exports = note;