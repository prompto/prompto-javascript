var EParserFactory = null;
var OParserFactory = null;
var PParserFactory = null;

exports.resolve = function() {
    EParserFactory = require("./EParserFactory").EParserFactory;
    OParserFactory = require("./OParserFactory").OParserFactory;
    PParserFactory = require("./PParserFactory").PParserFactory;
}

function Dialect() {
	return this;
}

Dialect.E = new Dialect();
Dialect.E.getParserFactory = function() {
	return new EParserFactory();
};
Dialect.E.toDialect = function(w, o) {
    o.toEDialect(w);
};
Dialect.E.toString = function(o) {
    return o.toEString();
};


Dialect.O = new Dialect();
Dialect.O.getParserFactory = function() {
	return new OParserFactory();
};
Dialect.O.toDialect = function(w, o) {
    o.toODialect(w);
};
Dialect.O.toString = function(o) {
    return o.toOString();
};

Dialect.P = new Dialect();
Dialect.P.getParserFactory = function() {
    return new PParserFactory();
};
Dialect.P.toDialect = function(w, o) {
    o.toPDialect(w);
};
Dialect.P.toString = function(o) {
    return o.toPString();
};

exports.Dialect = Dialect;
