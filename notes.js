//console.log('This is notes.js application');
const chalk= require('chalk');
const fs = require('fs')
const getNotes = () => {
    return "Your notes..";
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title;
    })
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        console.log(notes);
        savenotes(notes);
        console.log("New note added!");
    }
    else {
        console.log("Note title taken!")
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    if (notes.length !== 0) {
        let i = 0;let temp=0;
        for (i = 0; i < notes.length; i++) {
            if (notes[i].title === title)
            {
                temp =1;
                break;
            }
        }
        if (temp === 0) {
            console.log(chalk.bold.red("Note corresponding to given title does not exist"));
        }
        else {
            let j = i + 1;
            for (j = i + 1; j < notes.length; j++) {
                notes[j - 1] = notes[j];
            }
            notes.length = notes.length - 1;
            console.log(chalk.bold.blue('Note Removed'));
            savenotes(notes);
        }
    }
    else{
        console.log(chalk.bold.red("No note exist!"))
    }
}

const listNotes = ()=>{
    const notes=loadNotes();
    console.log(chalk.inverse("Your Notes"));
    notes.forEach((element) => {
        console.log(element.title);
    });
    savenotes(notes);
}

const readNote = (title)=>{
    const notes = loadNotes();let i = 0;let temp = 0;
    for(i=0; i<notes.length; i++)
    {
        if(notes[i].title === title){
            console.log(`${notes[i].title}`);
            console.log(`${notes[i].body}`);temp=1;
            break;
        }
    }
    if(temp === 0)
    {
        console.log(chalk.red.bold("No note found!"));
    }
    savenotes(notes);
}

const savenotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const retrievedJson = fs.readFileSync('notes.json').toString();
        return JSON.parse(retrievedJson);
    } catch (e) {
        return [];
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};