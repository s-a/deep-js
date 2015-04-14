
var monsterType = {
	alien:0,
	test:1
};

var sfadsaf=";";




var test = "xxx";

var Animal=function(/* String, asd asdasd asdasd type, name */  /*>>>>>>>>>>>>>>>>*/ type  /* String */ /* Fixme : test */) {
	var m = type + "test";
	this.say = function(text /* String */, velocity /* Integer */) {
		return "test" + m + text + velocity;
	};
	this.type = type;
	return this;
};



(function(anonymous) {
	var i = 0 + anonymous;
})();

function Cat(){}
function Dog(){}
function Cow(){}

var Monster = function(monsterType   /* String */){
	var m = monsterType + "test";
	this.say = function(text /* String */) {
		return "test";
	};
	this.type = monsterType;
	return this;
};

var Mutant = function() {
	return this;
};

Cat.prototype = new Animal();
Dog.prototype = new Animal();
Cow.prototype = new Monster();


Cat.miau = function(length /* Integer */) {
	for (var i = 0; i < length; i++) {
		console.log("miau");
	}
}

Cat.prototype.constructor = Animal;
Dog.prototype.constructor = Animal;
Cow.prototype.constructor = Mutant;

var cat = new Cat();
var dog = new Dog();
var cow = new Monster();


var 
scream 
=
 function
 (roar /* scream */) {
	console.log("Uarrrrrrgh" + roar);
}


Cow.prototype.scream = scream;

var globalScopeMehode = function  (parm1 /* Boolean */) {
	return "global scope";
}


var ScopeTest = function  (parm1 /* Boolean */) {
	var TestingGlobalScope = function(parm1 /* Boolean */) {
		this.foo = globalScopeMehode;
		return this;
	}
	this.bar = TestingGlobalScope;
	return this;
}


console.log(cat instanceof Cat);
console.log(dog instanceof Dog);
console.log(cow instanceof Cow);