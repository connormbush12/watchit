#!/usr/bin/env node

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal');
const fs = require('fs');
//First, we need to require the Child Processes library. We only need the spawn function from this, so we can destructure spawn from it.
const { spawn } = require('child_process');

program.version('0.0.1').argument('[ filename ]', 'Name of a file to execute').action(async ({ filename }) => {
	const name = filename || 'index.js';
	try {
		await fs.promises.access(name);
	} catch (err) {
		throw new Error(`Could not the file ${name}`);
	}
	const start = debounce(() => {
		//Now, we use spawn and pass through three arguments: a) our command. this is 'node' as this is the command we type in whenever we use the terminal; b) our argument; for this, we include an array and put in our file name we want to run; finally, we use the options object to include 'stdio' with inherit.
		spawn('node', [ name ], { stdio: 'inherit' });
	}, 100);

	chokidar.watch('.').on('all', start).on('change', start).on('unlink', start);
});

program.parse(process.argv);
