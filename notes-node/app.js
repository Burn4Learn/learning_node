const fs = require('fs');
const notes = require('./notes.js');
const _ = require('lodash');
const yargs = require('yargs');

const titleOptions = {  describe: 'Title of note', 
                      demand: true, 
                      alias: 't' } ;

const bodyOptions = { describe: 'Body of note', 
                    demand: true, 
                    alias: 'b' } ;

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions, 
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;

var command = process.argv[2];

switch(command){
    case 'add':
        var note = notes.addNote(argv.title, argv.body);
        if (note){
            console.log('Note created.\n');
            notes.logNote(note);
        }
        else
            console.log(`Note with title ${argv.title} already exists. Cannot create the note.`);
    break;
    case 'list':
        var allNotes = notes.getAll();
        console.log(`Printing ${allNotes.length} note(s).`);
        allNotes.forEach((note) => notes.logNote(note));
    break;
    case 'read':
        var note = notes.getNote(argv.title);
        if (note)
            notes.logNote(note);
        else
            console.log(`Note not found`);

    break;
    case 'remove':
        var noteRemoved = notes.removeNote(argv.title);
        var message = `Note ${argv.title} `;
        message += noteRemoved ? 'removed' : 'not found.';
        console.log( message);
    break;
    default:
        console.log('Command not recognized.');
}