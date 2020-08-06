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
Dialect.E.getParserFactory = () => new EParserFactory();
Dialect.E.toDialect = (w, o) => {
    o.toEDialect(w);
};
Dialect.E.toString = o => o.toEString();


Dialect.O = new Dialect("O");
Dialect.O.getParserFactory = () => new OParserFactory();
Dialect.O.toDialect = (w, o) => {
    o.toODialect(w);
};
Dialect.O.toString = o => o.toOString();

Dialect.M = new Dialect("M");
Dialect.M.getParserFactory = () => new MParserFactory();
Dialect.M.toDialect = (w, o) => {
    o.toMDialect(w);
};
Dialect.M.toString = o => o.toMString();

exports.Dialect = Dialect;
