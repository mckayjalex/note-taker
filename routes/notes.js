const note = require('express').Router();
const express = require('express');
const fs = require('fs');
const path = require('path');

note.use(express.json());

let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));

// api/notes POST
note.post('/', (req,res) => {
    let { title, text } = req.body;
    let id = 0;
    id++;
    const newNotes = {
        id,
        title,
        text
    }

    notes.push(newNotes);

    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes))
    res.json(notes);
})
//  api/notes DELETE
    note.delete('/:id', (req, res) => {

    let id = req.params.id.toString();
    notes = notes.filter((val) => {
        let data = val.id != id
        return data;
    });
    
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
    
})

// api/notes GET

note.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
})

module.exports = note;