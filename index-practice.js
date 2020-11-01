#!/usr/bin/env node

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal')
const fs = require('fs')

program.argument('[filename]', 'Input filename here').action(async (args) => {
	console.log(args.filename)
	if(await fs.promises.access('.', args.filename) ) {
		throw new Err
		or('This is not a valid filename, homie')
	}
	console.log(args)
})
program.parse(process.argv)

const start = debounce(() => {
	console.log('STARTED USERS PROGRAM');
}, 100);

chokidar
	.watch('.')
	.on('all', start)
	.on('change', () => {
		console.log('FILE CHANGED');
	})
	.on('unlink', () => {
		console.log('FILE UNLINKED');
	});
