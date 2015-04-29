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


if (program.describe.length === 0) {
  program.describe = ["*"];
}

if (program.file){
  console.log("processing \"" + program.file + "\"...");
  var deep = new Deep(program.file);
  deep.parse();
}



if (program.output){
  var outputFilename = program.output;
  deep.log(program.describe, 3);
  var definitions = [];

  if (program.describe[0] === "*") {
    definitions = deep.definitions;
  } else {
    for (var i = 0; i < program.describe.length; i++) {
      var e = program.describe[i];
      for (var d = 0; d < deep.definitions.length; d++) {
        var def = deep.definitions[d];
        if (def.name === e){
          definitions.push(def);
          break;
        }
      }
    }
  }
  var output = renderer.render("./template/markdown.MD", {definitions: definitions, outputFilename:path.basename(outputFilename)}, program.describe);
  
  require("fs").writeFileSync(outputFilename, output);


  //deep.log(deep.definitions,6);
}