var ejs = require("ejs");


var Renderer = function  () {
	return this;
}


Renderer.prototype.render = function(templateFilename, definitions) {
	var template = require("fs").readFileSync(templateFilename).toString();
	return ejs.render(template, {definitions:definitions});
};



module.exports = new Renderer();