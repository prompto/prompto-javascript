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

Dialect.O = new Dialect();
Dialect.O.getParserFactory = function() {
	return new OParserFactory();
};
Dialect.O.toDialect = function(w, o) {
    o.toODialect(w);
};

Dialect.P = new Dialect();
Dialect.P.getParserFactory = function() {
    return new PParserFactory();
};
Dialect.P.toDialect = function(w, o) {
    o.toPDialect(w);
};

exports.Dialect = Dialect;
