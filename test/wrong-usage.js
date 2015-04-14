var fs = require("fs");
var should = require('should');

var Deep;
var coverageMode = fs.existsSync("lib-cov/index.js");

if (coverageMode){
	Deep = require("./../lib-cov/");
} else {
	Deep = require("./../lib/");
}

var deep;


describe('wrong usage', function(){

	it('should throw exception on usage before declaration', function(){
		var filename = "use-case-wrong-usage.js";
		deep = new Deep(filename);

		(function(){
			deep.parse();
		}).should.throw();
	});

	it('should throw exception when trying to access non existing method declaration', function(){
		(function(){
			deep.get("my super method!");
		}).should.throw();
	});

	it('should throw exception when trying to find scope object without name', function(){
		(function(){
			deep.findInScopes();
		}).should.throw();
	});

	it('should throw exception when trying to find scope object without current scope', function(){
		(function(){
			deep.findInScopes("my super method!");
		}).should.throw();
	});

	it('should find method definitions', function(){
		deep.definitions.length.should.be.above(0);
	});

	it('should identify each method definition by name', function(){
		deep.each(function(i,fun) {
			should.exist(fun.name);
		});
	});

});