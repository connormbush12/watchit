#!/usr/bin/env node

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal');
const fs = require('fs');
const { spawn } = require('child_process');

//We want our error message to be in a different color, so we require 'chalk' again and then install it in the terminal using 'npm install chalk'
const chalk = require('chalk');

program.version('0.0.1').argument('[ filename ]', 'Name of a file to execute').action(async ({ filename }) => {
	const name = filename || 'index.js';
	try {
		await fs.promises.access(name);
	} catch (err) {
		throw new Error(`Could not the file ${name}`);
	}
	//One issue we have is that if we change a file, it doesn't kill the execution of the previous version of the file, so we want to add on that functionality
	//first, we declare a let variable for a process (called it proc for short). Want to keep this undefined initially
	let proc;
	const start = debounce(() => {
		//first, we check if the process is defined. If it isn't (first time doing this), we'll skip over this if statement
		if (proc) {
			//If the proc does exist, then we kill it using .kill()
			proc.kill();
		}
		//Following that, we send a message alerting the user that a file has changed and we are restarting the program. We put this in blue to make it stand out
		console.log(chalk.blue('<<<< Starting program...'));
		//Following that, we set proc = to the spawn function so that the next iteration through, it will kill this process if we change anything
		proc = spawn('node', [ name ], { stdio: 'inherit' });
	}, 100);

	chokidar.watch('.').on('all', start).on('change', start).on('unlink', start);
});

program.parse(process.argv);
