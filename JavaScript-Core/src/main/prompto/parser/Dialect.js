var EParserFactory = null;
var OParserFactory = null;
var MParserFactory = null;

exports.resolve = () => {
    EParserFactory = require("./EParserFactory").EParserFactory;
    OParserFactory = require("./OParserFactory").OParserFactory;
    MParserFactory = require("./MParserFactory").MParserFactory;
}

function Dialect(name) {
    this.name = name;
	return this;
}

Dialect.E = new Dialect("E");
Dialect.E.getParserFactory = () => {
	return new EParserFactory();
};
Dialect.E.toDialect = (w, o) => {
    o.toEDialect(w);
};
Dialect.E.toString = o => {
    return o.toEString();
};


Dialect.O = new Dialect("O");
Dialect.O.getParserFactory = () => {
	return new OParserFactory();
};
Dialect.O.toDialect = (w, o) => {
    o.toODialect(w);
};
Dialect.O.toString = o => {
    return o.toOString();
};

Dialect.M = new Dialect("M");
Dialect.M.getParserFactory = () => {
    return new MParserFactory();
};
Dialect.M.toDialect = (w, o) => {
    o.toMDialect(w);
};
Dialect.M.toString = o => {
    return o.toMString();
};

exports.Dialect = Dialect;
