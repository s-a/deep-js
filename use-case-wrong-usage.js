var Animal = function() {
	return this;
}

Animal.prototype.scream = scream;


var scream = function (roar /* scream */) {
	console.log("Uarrrrrrgh" + roar);
}




