// Importing modules
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

// PORT 
const PORT = process.env.PORT || 3001;

const app = express();
// Middle where to access the public folder
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// Index /
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

// /notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
})

// Wildcard so that anything that isnt the above will result in a reponse of index.html *
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})
// Listen 
app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
})