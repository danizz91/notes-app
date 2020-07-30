const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return 'Your notes..'

}

const addNote = (title,body)=> {
        const notes = loadNotes()
        const duplicateNote = notes.find((note)=> note.title === title)
    if (!duplicateNote) {
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    }else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote =  (title) => {
    const notes = loadNotes()
    const noteToKeep = notes.filter((note) => note.title !== title)

        /*const noteToKeep = notes.filter(function (note) {
            return note.title !== title*/

    if (noteToKeep.length < notes.length){
        console.log(chalk.green.inverse("Note removed!"))
        saveNotes(noteToKeep)
    }
    else{
        console.log(chalk.red.inverse("No note found!"))
    }

}

const saveNotes =  (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)

}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green.inverse('Your Notes'))
    notes.forEach(note => console.log('Title of note:'+note.title+'\n'+'Body of note:'+note.body))
}

const readNote = (title) => {
    const notes = loadNotes()
     const readNote = notes.find((note) => note.title === title)
        if(readNote){
            console.log("Reading the note:\nNote Title:" +readNote.title+'\n'+ 'Note Body:'+  readNote.body)
        }
        else{
            console.log(chalk.red.inverse("Note not found!"))
        }
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}