#!/usr/bin/env node

var program = require('commander');
var Deep = require("./deep.js");

/*
var filename = "test.js";
var deep = new Deep(filename);
deep.parse();

log(deep.parseResult,3);
*/
module.exports = Deep;

program
  .version(require("./../package.json").version)
  .option('-f, --file <Sting>', 'Single file to parse')
  //.option('-t, --test <n>', 'Render only n seconds of a video for test purposes', parseFloat)
  .parse(process.argv);



if (program.file){
	console.log(program.file);
	//var filename = "use-case-main.js";
    var deep = new Deep(program.file);
    deep.parse();
    deep.log(deep.definitions,6);
}