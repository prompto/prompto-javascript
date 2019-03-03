var EParserFactory = null;
var OParserFactory = null;
var MParserFactory = null;

exports.resolve = function() {
    EParserFactory = require("./EParserFactory").EParserFactory;
    OParserFactory = require("./OParserFactory").OParserFactory;
    MParserFactory = require("./MParserFactory").MParserFactory;
}

function Dialect(name) {
    this.name = name;
	return this;
}

Dialect.E = new Dialect("E");
Dialect.E.getParserFactory = function() {
	return new EParserFactory();
};
Dialect.E.toDialect = function(w, o) {
    o.toEDialect(w);
};
Dialect.E.toString = function(o) {
    return o.toEString();
};


Dialect.O = new Dialect("O");
Dialect.O.getParserFactory = function() {
	return new OParserFactory();
};
Dialect.O.toDialect = function(w, o) {
    o.toODialect(w);
};
Dialect.O.toString = function(o) {
    return o.toOString();
};

Dialect.M = new Dialect("M");
Dialect.M.getParserFactory = function() {
    return new MParserFactory();
};
Dialect.M.toDialect = function(w, o) {
    o.toMDialect(w);
};
Dialect.M.toString = function(o) {
    return o.toMString();
};

exports.Dialect = Dialect;
