const validator = require('validator')
const notes = require('./notes.js')
const chalk = require('chalk')
const yargs = require('yargs')


yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
      title: {
          describe: 'Note title',
          demandOption: true,
          type: 'string'
      },
        body: {
          describe: 'Body node',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title,argv.body)
    }
})
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
      title: {
          describe: 'Note title',
          demandOption:true,
          type:'string'
      }
    },
    handler(argv) {
        notes.removeNote(argv.title)
        console.log('The note is removed')
    }
})

yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        notes.listNotes()
        console.log("The notes are ended.")
    }
})
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'enter note title to read',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv) {
        console.log("Seraching for the node title")
        notes.readNote(argv.title)
    }
})


yargs.parse()

