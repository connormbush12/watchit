#!/usr/bin/env node

//To include chokidar, we first have to download it in our terminal. To do this, go to the terminal and type in "npm install chokidar"

//To include it in this project, we require 'chokidar'
const chokidar = require('chokidar');

//Now, we use it to watch for three different types of events
chokidar
	// the '.' means it is watching for it in our current directory
	.watch('.')
	//'all' is any time we start up the program or create a new file (with some other funky things that we'll see next lesson)
	.on('all', () => {
		console.log('STARTED USERS PROGRAM');
	})
	//change is any time we change or edit a file and then save it
	.on('change', () => {
		console.log('FILE CHANGED');
	})
	//unlink is any time a file is deleted
	.on('unlink', () => {
		console.log('FILE UNLINKED');
	});
