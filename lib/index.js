#!/usr/bin/env node

var program = require('commander');
var Deep = require("./deep.js");
var renderer = require("./render.js");
var path = require("path");

module.exports = Deep;

function list(val) {
  return val.split(',');
}

// https://github.com/tj/commander.js?utm_source=jobboleblog#coercion
program
  .version(require("./../package.json").version)
  .option('-f, --file <Sting>', 'JavaScript file to parse')
  .option('-d, --describe <items>', 'A comma seperated list of JavaScript names that should be described', list, [])
  .option('-o, --output <Sting>', 'Documentation output file')
  //.option('-t, --test <n>', 'Render only n seconds of a video for test purposes', parseFloat)
  .parse(process.argv);


if (program.describe.length === 0){
  throw "\"--describe -d is not an optional parameter\""
}

if (program.file){
  console.log("processing \"" + program.file + "\"...");
  var deep = new Deep(program.file);
  deep.parse();
}


if (program.file){
  console.log("processing \"" + program.file + "\"...");
  var deep = new Deep(program.file);
  deep.parse();
}


if (program.output){
  var outputFilename = program.output;
  var output = renderer.render("./template/markdown.MD", {definitions: deep.definitions, outputFilename:path.basename(outputFilename)}, program.describe);
  
  output = output.replace(/\t/g, "");
  output = output.replace(/^\s*[\r\n]/gm, "");
  
  require("fs").writeFileSync(outputFilename, output);

//  deep.log(deep.definitions,6);
}