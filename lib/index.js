#!/usr/bin/env node

var program = require('commander');
var Deep = require("./deep.js");
var renderer = require("./render.js");

module.exports = Deep;


// https://github.com/tj/commander.js?utm_source=jobboleblog#coercion
program
  .version(require("./../package.json").version)
  .option('-f, --file <Sting>', 'JavaScript file to parse')
  .option('-o, --output <Sting>', 'Documentation output file')
  //.option('-t, --test <n>', 'Render only n seconds of a video for test purposes', parseFloat)
  .parse(process.argv);



if (program.file){
	console.log("processing \"" + program.file + "\"...");
    var deep = new Deep(program.file);
    deep.parse();
	deep.log(deep.definitions,6);
}

if (program.output){
	var output = renderer.render("./template/markdown.MD", deep.definitions);
	console.log(output);
	require("fs").writeFileSync(program.output, output);
}