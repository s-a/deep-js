var ejs = require("ejs");


var Renderer = function  () {
	return this;
}


Renderer.prototype.render = function(templateFilename, definitions) {
	var template = require("fs").readFileSync(templateFilename).toString();
	/*ejs.filters.lowercase = function(obj) {
	  return obj.toLowerCase();
	};*/
	return ejs.render(template, {deep:definitions});
};



module.exports = new Renderer();