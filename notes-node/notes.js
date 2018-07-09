const fs = require('fs');


var logNote = (note) => {
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

var fetchNotes = () => {
    try{
        var noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    }catch (e){
        return [];
    }    
};

var saveNotes  = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var duplicateNote = getNote(title);
    if (duplicateNote === null){
        var note = {
            title, 
            body
        };
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};


var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    var notes = fetchNotes();
    for (var i = 0; i < notes.length; ++i) {
        if (notes[i].title === title)
            return notes[i];
    }
    return null;
};

var removeNote = (title) => {
    var notes = fetchNotes();
    var i = notes.length;
    while(--i){
        if (notes[i].title === title){
            notes.splice(i, 1);
            saveNotes(notes);
            return true;
        }
    }
    return false;
};

module.exports =  {
    addNote,
    getAll, 
    getNote,
    removeNote,
    logNote
};