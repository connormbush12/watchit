#!/usr/bin/env node

//While we could create a custom debounce, we can use the lodash.debounce external library in order to do this easily

//First, we have to install it in our terminal. Go to the terminal (first make sure the program is quit by typing 'ctrl+c'), and then type 'npm install lodash.debounce'

//Then, we require it below
const debounce = require('lodash.debounce');
const chokidar = require('chokidar');

//Now, we replace the callback function that we had for the 'all' event listener with this start function
//We wrap the start function with debounce and use 100 ms as our debounce time
const start = debounce(() => {
	console.log('STARTED USERS PROGRAM');
}, 100);

chokidar
	.watch('.')
	//now, we just put in the start function here
	.on('all', start)
	.on('change', () => {
		console.log('FILE CHANGED');
	})
	.on('unlink', () => {
		console.log('FILE UNLINKED');
	});
