//var UglifyJS = require("uglify-js2");
var UglifyJS = require("uglify-js2");
var util = require("util");

var log = function(obj, depth) {
    var showHidden = false;
    var colorize = true;
	console.log(util.inspect(obj, showHidden, depth, colorize));
};


var regExComments = /(?:\/\*(?:[\s\S]*?)\*\/)|(?:\/\/(?:.*)$)/gm;


var getComments = function (src) {
    if (src){
        return src.replace("/*", "").replace("*/", "").replace("//", "").trim();
    }
};

var space = function  (str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
        result += " ";
    }
    return result;
};

var replaceComment = function(methodSourceCode, comment){
    var result = methodSourceCode;
    result = result.replace(comment.text, space(comment.text));
    return result;
};

var parseComments = function  (methodSourceCode) {
    var comments = [];
    var result;
    while ((result = regExComments.exec(methodSourceCode)) !== null) {
        var commentText = result[0];
        var comment = {
            pos: result.index,
            endpos : result.index + commentText.length,
            text : commentText
        };
        comments.push(comment);

    }
    return comments;
};

var getCommentNextTo = function  (comments, position) {
    for (var i = 0; i < comments.length; i++) {
        var comment = comments[i];
        if (comment.pos > position){
            return comment;
        }
    }
};

var parseMethodParms = function(rawMethodSourceCode, argnames) {
    var i;
    var parms = [];
    var methodSourceCode = rawMethodSourceCode;
    var comments = parseComments(rawMethodSourceCode);


    // remove comments
    for (i = 0; i < comments.length; i++) {
        methodSourceCode = replaceComment(methodSourceCode, comments[i]);
    }

    // only comments in function header
    comments = parseComments(rawMethodSourceCode.slice(0, methodSourceCode.indexOf(")")));

    if (argnames){
        for (i = 0; i < argnames.length; i++) {
            var arg = argnames[i].start.value;
            var argPos = methodSourceCode.indexOf(arg);
            var comment = getCommentNextTo(comments, argPos);

            if (comment){
                comment = comment.text;
            }
            parms.push({
                name : arg,
                type : getComments(comment)
            });
        }

    }
    return parms;
};

var extractMethodeParms = function(code, node, methodName) {
    var methodSourceCode;


    // FIXME: #1
    methodSourceCode = code.split("\r\n")[node.start.line-1];
    
    if (node.argnames[0]){
        if (!methodSourceCode){
            // FIXME: Why positions does not fit method source code in string?
            methodSourceCode = code.substring(node.argnames[0].start.pos + 1);
        }
        return parseMethodParms(methodSourceCode, node.argnames);
    }
};

var getMethodParameter = function(name) {
    for (var i = 0; i < this.parms.length; i++) {
        var parm = this.parms[i];
        if (parm.name === name){
            return parm;
        }
    }
};

var getMethod = function(name) {
    for (var i = 0; i < this.methods.length; i++) {
        var method = this.methods[i];
        if (method.name === name){
            return method;
        }
    }
};

var extractMethodeInfos = function(code, node) {

    var name = null;

    if (node.name === null) {
        name = code.split("\r\n")[node.start.line-1];

        // FIXME: #1 Does not recognise multile function definitions like 
        /*
            var
            test
            =
            function(){};
        */

        name = name.slice(0,node.start.col).split(";").pop().split("var").pop();
        name = name.replace(/ /g, "").replace(/\t/g, ""   );
        name = name.split("=")[0];
        if (name === ""){
            name = null;
        }
    } else {
        if (node.name.name){
            name = node.name.name;
        } else {
            name = node.name;
        }
    }


    var parms = extractMethodeParms(code, node, name);
/*    if (name === "Animal"){

    }
*/
    return {
        name    : name,
        parms   : parms,
        parm    : getMethodParameter,
        method  : getMethod,
    };

};





var Deep = function(filename) {
    var code = "\r\n" + require("fs").readFileSync(filename).toString();

    var toplevel = UglifyJS.parse(code);
    this.definitions = [];
    var self = this;
    self.nodes = [];

    var walker = new UglifyJS.TreeWalker(function(node){
        
        // http://lisperator.net/uglifyjs/ast

        var addFunction = function() {
            var fun = extractMethodeInfos(code, node);
            self.nodes.push(node);

            if (fun.name){
                self.definitions.push(fun);
            }
        };

        if (node instanceof UglifyJS.AST_Defun){
            addFunction();
        }

        if (node instanceof UglifyJS.AST_Function ) {
            addFunction();
        }


        if (node instanceof UglifyJS.AST_Assign ) {


            if (node.left.expression.property === "prototype"){
                var nd, func;
                if (node.left.property === "constructor"){
                    nd = self.getDeclarationFromNode(node.right.name, node.right.scope);
                    func = extractMethodeInfos(code, nd);
                    self.get(node.start.value).construct = func;
                } else {
                    nd = self.getDeclarationFromNode(node.right.name, node.right.scope);
                    func = extractMethodeInfos(code, nd);
                    if (!self.get(node.left.start.value).methods){
                        self.get(node.left.start.value).methods = [];
                    }
                    func.name = node.left.property; 
                    self.get(node.left.start.value).methods.push(func);
                    /*console.log(
                        node.left.start.value,  // Object,
                        node.left.property,     // prototype method name
                        node.right.name         // methodename
                    );*/
                }


            }
            if (node.left.property === "prototype"){
                var declarationNode = self.getAssignedDeclarationNode(node.right.expression);

                var fun = extractMethodeInfos(code, declarationNode);
                self.get(node.left.expression.name).extends = fun;

            }

        }
/*
        if (node instanceof UglifyJS.AST_Assign ) {
            if (node.left.property === "constructor"){

            }
        }
*/
    });

    this.parse = function() {
        toplevel.figure_out_scope();
        toplevel.walk(walker);
    };

    return this;
};


Deep.prototype.getAssignedDeclarationNode = function(expression) {
    var declarationNode = this.findInScopes(expression.name, expression.scope, "variables");
    if (declarationNode === null) {
        declarationNode = this.findInScopes(expression.name, expression.scope, "functions")
    }

    if (!declarationNode){
        throw "Declaration of " + expression.name + " not found. Maybe it was used before declaration?";
    }

    return declarationNode;
};

Deep.prototype.getDeclarationFromNode = function(name, scope) {
    var declarationNode = this.findInScopes(name, scope, "variables");
    if (declarationNode === null) {
        declarationNode = this.findInScopes(name, scope, "functions")
    }

    if (!declarationNode){
        throw "Declaration of " + name + " not found. Maybe it was used before declaration?";
    }

    return declarationNode;
};

Deep.prototype.log = log;


var FunctionDefinition = function(fun) {
    this.name = name;
    this.args = fun.parms;

    return this;
};



FunctionDefinition.prototype.get = function(name) {
    for (var i = 0; i < this.args.length; i++) {
        if (this.args[i].name === name){
            return this.args[i];
        }
    }
};

Deep.prototype.get = function(name) {
    var result = null;
    for (var i = 0; i < this.definitions.length; i++) {
        var fun = this.definitions[i];
        if (fun.name === name){
            result = fun;
            break;
        }
    }
    if (result === null){
        throw "Declaration of " + name + " not found. Maybe it was used before declaration?";
    }
    return result;
};

Deep.prototype.each = function(iterator) {
    for (var i = 0; i < this.definitions.length; i++) {
        iterator(i, this.definitions[i]);
    }
};

Deep.prototype.getParsedNode = function(offset) {
    for (var i = 0; i < this.nodes.length; i++) {
        var node = this.nodes[i];
        if (node.start.pos > offset){
            return node;
        }
    }
};

var findInScopes = function (name, currentScope, type){

    if (!currentScope){
        throw "need currentScope for " + name + " of " + type;
    }
    var result = null;
    name = "$"+ name;
    var parentScope = currentScope.parent_scope;
    if (currentScope[type] && currentScope[type]._values[name]) {
     
        result = this.getParsedNode(currentScope[type]._values[name].orig[0].start.pos);
    }
    if (result === null && parentScope ){
        result = this.findInScopes(name, parentScope, type);
    }
    return result;
}

Deep.prototype.findInScopes = findInScopes;

/*
    var filename = "test.js";
    var deep = new Deep(filename);
    deep.parse();

    log(deep.definitions,6);
*/
module.exports = Deep;