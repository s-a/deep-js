var ejs = require("ejs");


var Renderer = function  () {
	return this;
}


Renderer.prototype.render = function(templateFilename, definitions) {
	var template = require("fs").readFileSync(templateFilename).toString();
	/*ejs.filters.lowercase = function(obj) {
	  return obj.toLowerCase();
	};*/

	definitions.lineSlurp = "\\";
	var result = ejs.render(template, {deep:definitions});

  	result = result.replace(/\t/g, "");
  	result = result.replace(/\\[\r\n]*/g, "");
  	//result = result.replace(/^[\r\n]/gm, "");

  	return result;
};



module.exports = new Renderer();