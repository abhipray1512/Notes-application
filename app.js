//const validator = require('validator');
const yargs = require('yargs');
const chalk = require('chalk');
const notes = require('./notes.js');
//console.log(chalk.bold.blue('Error!'));//inverse switches background color with text color
//console.log(getnotes());
//console.log(process.argv);
//yargs.version('1.1.0');//customizing the args version
//crete add command
yargs.command({
    command: 'add',
    description:'Add a new note',
    builder:{
        title:{//making a title option for add command
            describe:'Note title',
            demandOption:'true',//this means that specifying this command is essential for application to run
            type:'string'//this tells us about the type of our option
        },
        body:{
            describe: 'Specifying the body of our notes app',
            demandOption:'true',
            type:'string' 
        }
    },
    handler: function(argv){
        notes.addNote(argv.title,argv.body)
    }
})
//create remove command
yargs.command({
    command: 'remove',
    description:'Removing a note!',
    builder:{
        title:{
            description: "Title of node to be deleted",
            demandOption:"true",
            type:"string"
        }
    },
    handler: function(argv){
        notes.removeNote(argv.title);
    }
})
//create list command
yargs.command({
    command: 'list',
    description:'Listing a new note',
    handler: function(){
        notes.listNotes();
    }
})
//read list command
yargs.command({
    command: 'read',
    description:'Reading a new note',
    builder:{
        title:{
            description:'Note to be found',
            demandOption:true,
            type:"string"
        }
    },
    handler: function(argv){
       notes.readNote(argv.title);
    }
})
//console.log(yargs.argv);
yargs.parse();
//console.log(validator.isEmail('abhipray1512@gmail.com'));