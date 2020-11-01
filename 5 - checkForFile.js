#!/usr/bin/env node

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal');

//First, we need to require File System so that we can use fs.promises.access()
const fs = require('fs');

//We then move our 'start' function and chokidar code inside of our program
//Instead passing through args into our .action() callback function, we'll destructure filename from whatever we pass through so that we can use that variable
program.version('0.0.1').argument('[ filename ]', 'Name of a file to execute').action(async ({ filename }) => {
	//If they don't give a filename, we want to default to using the index.js if it exists. Therefore, we make a const variable named 'name' and set it equal to filename (destructured) or 'index.js' if a filename wasn't given.
	const name = filename || 'index.js';
	//Now, we use fs.promises.access() to check if the filename they passed through as an argument (or 'index.js' if they didn't pass one through) is there or not
	try {
		//we await this, so we make the callback async above
		await fs.promises.access(name);
		//if it's not there, then it will default and throw the error
	} catch (err) {
		throw new Error(`Could not the file ${name}`);
	}
	const start = debounce(() => {
		console.log('STARTED USERS PROGRAM');
	}, 100);

	//For any 'change' or 'unlink', we want to restart the program, so we'll use the start function here
	chokidar.watch('.').on('all', start).on('change', start).on('unlink', start);
});

program.parse(process.argv);
