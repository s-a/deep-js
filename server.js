var express = require('express');
var app = express();

var program = require('commander');
var Deep = require("./lib/deep.js");
var renderer = require("./lib/render.js");
var path = require("path");

var marked = require('marked');

// Outputs: <p>I am using <strong>markdown</strong>.</p>
  
 // output = output.replace(/^\s*[\r\n]/gm, "");

app.get('/', function (req, res) {
  	var inputFilename = "./use-case-main.js";
  	var deep = new Deep(inputFilename);
  	console.log("processing \"" + inputFilename + "\"...");
  	deep.parse();
  	var outputFilename = "use-case-main.js.MD";
  	var output = renderer.render("./template/markdown.MD", {definitions: deep.definitions, outputFilename:path.basename(outputFilename)}, program.describe);
  	output = marked(output.replace(/\t/g, ""));
	res.send("<!DOCTYPE html><html><head><title></title></head><body>" + output + "</body></html>");
});

app.listen(process.env.PORT || 3000);