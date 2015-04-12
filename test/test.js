/*
var fs = require("fs");
var assert = require("assert");
var path = require('path'); 
*/
var should = require('should');

var Deep = require("./../deep.js");

/*var program = require('commander');
var fs = require('fs');
var moment = require('moment');
*/

var deep;

before(function  () {
	var filename = "test.js";
	deep = new Deep(filename);
	deep.parse();
	deep.log(deep.definitions,4);
});

var constructorExists = function (name) {
		it('should identify constructor of "' + name + '"', function(){
		deep.get(name).name.should.be.equal(name);
		});
};

var parameterExists = function (functionName, parameterName) {
		it('should identify argument "' + parameterName + '" in method "' + functionName + '"', function(){
			var parm = deep.get(functionName).parm(parameterName);
			should.exist(parm);
		parm.name.should.be.equal(parameterName);
		});
};

var methodeExists = function (name, methodeName) {
		it('should identify method "' + methodeName + '" in "' + name + '"', function(){
			var fun = deep.get(name).method(methodeName);
			should.exist(fun);
			fun.name.should.be.equal(methodeName);
		});
};

var parameterExistsAndIsTypeOf = function (functionName, parameterName, parameterType) {
		it('should identify datatype of argument "' + parameterName + '" in method "' + functionName, function(){
			var parm = deep.get(functionName).parm(parameterName);
			should.exist(parm);
		parm.type.should.be.equal(parameterType);
		});
};

var extendsInstance = function(functionName, baseFunctionName ) {
		it('should identify that "' + functionName + '" extends "' + baseFunctionName + '"', function(){
		deep.get(functionName).extends.name.should.be.equal(baseFunctionName);
		});
};

var constructorMethode = function(baseObject, constructorMethodeName) {
		it('should identify that "' + baseObject + '\' s" constructor is "' + constructorMethodeName + '"', function(){
			deep.get(baseObject).construct.name.should.be.equal(constructorMethodeName);
		});
};

describe('parse javascript code', function(){
	
		it('should find method definitions', function(){
		deep.definitions.length.should.be.above(0);
		});

		constructorExists           ("Monster");
		parameterExists  			      ("Monster", "monsterType");
		parameterExistsAndIsTypeOf 	("Monster", "monsterType", "String");

		constructorExists           ("Animal");
		parameterExists             ("Animal", "type");
		parameterExistsAndIsTypeOf  ("Animal", "type", "String");

		constructorExists			("Dog");
		extendsInstance				("Dog", "Animal");
		constructorMethode    ("Dog", "Animal");

		constructorExists     ("Cow");
		extendsInstance       ("Cow", "Monster");
		constructorMethode    ("Cow", "Mutant");
		methodeExists     		("Cow", "scream");


		constructorExists     ("Cat");
		extendsInstance       ("Cat", "Animal");
		constructorMethode    ("Cat", "Animal");
		constructorExists     		("Cat.miau");

		it('should identify each method definition by name', function(){
			deep.each(function(i,fun) {
				should.exist(fun.name);
			});
		});
		
});

