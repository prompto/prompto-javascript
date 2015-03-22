var path = require("path");
var presto = require("../index"); // presto
var antlr4 = require("antlr4");
var Out = require("../runtime/utils/Out").Out;
var fs = require("fs");

function getResourcesFolder() {
	var presto = module.filename;
	while(path.basename(presto).indexOf("presto-")!=0) {
		var parent = path.dirname(presto);
        if(parent==presto)
            throw "Could not find presto root!";
        presto = parent;
	}
    presto = path.dirname(presto);
	return path.normalize(presto + path.sep + "presto-tests" + path.sep + "Tests" + path.sep + "resources");
}

var resourcesFolder = getResourcesFolder();

exports.getResource = function(fileName) {
	fileName = fileName.replace("/", path.sep);
	fileName = path.normalize(resourcesFolder + path.sep + fileName);
	return new antlr4.FileStream(fileName);
};

function getResourceAsString(fileName) {
    fileName = fileName.replace("/", path.sep);
    fileName = path.normalize(resourcesFolder + path.sep + fileName);
    return fs.readFileSync(fileName).toString();
}

function readExpected(fileName) {
	var idx = fileName.lastIndexOf('.');
	fileName = fileName.substring(0, idx) + ".txt";
	fileName = fileName.replace("/", path.sep);
	fileName = path.normalize(resourcesFolder + path.sep + fileName);
	var all = fs.readFileSync(fileName).toString();
	return all.split("\n");
}

exports.checkSameOutput = function(test, resource) {
	var read = Out.read();
	var expected = readExpected(resource);
	if(expected.length===1) {
		test.equal(read, expected[0]);
	} else {
		for(var idx=0;idx<expected.length;idx++) {
			if(read===expected[idx])
				return;
		}
		test.equal(read, expected[0]); // to get a display
	}
};

function parseEString(input) {
    var parser = new presto.parser.ECleverParser(input);
    return parser.parse();
}

function parseOString(input) {
    var parser = new presto.parser.OCleverParser(input);
    return parser.parse();
}

function parsePString(input) {
    var parser = new presto.parser.PCleverParser(input);
    return parser.parse();
}

function assertEquivalent(test, expected, actual) {
    expected = removeWhitespace(expected).replace("modulo","%");
    actual = removeWhitespace(actual).replace("modulo","%");
    test.equal(actual, expected);
}

function removeWhitespace(s) {
    s = replaceAll(s, "\n", "");
    s = replaceAll(s, "\t", "")
    s = replaceAll(s, " ", "");
    return s;
}

function replaceAll(s, a, b) {
    return s.split(a).join(b);
}

exports.compareResourceEOE = function(test, resourceName) {
    var expected = getResourceAsString(resourceName);
    // console.log(expected);
    // parse e source code
    var dle = parseEString(expected);
    var context = presto.runtime.Context.newGlobalContext();
    dle.register(context);
    // rewrite as o
    var writer = new presto.utils.CodeWriter(presto.parser.Dialect.O, context);
    dle.toDialect(writer);
    var o = writer.toString();
    // console.log(o);
    // parse o source code
    var dlo = parseOString(o);
    context = presto.runtime.Context.newGlobalContext();
    dlo.register(context);
    // rewrite as e
    writer = new presto.utils.CodeWriter(presto.parser.Dialect.E, context);
    dlo.toDialect(writer);
    var actual = writer.toString();
    // console.log(actual);
    // ensure equivalent
    assertEquivalent(test, expected, actual);
    test.done();
};

exports.compareResourceEPE = function(test, resourceName) {
    var expected = getResourceAsString(resourceName);
    // console.log(expected);
    // parse e source code
    var dle = parseEString(expected);
    var context = presto.runtime.Context.newGlobalContext();
    dle.register(context);
    // rewrite as o
    var writer = new presto.utils.CodeWriter(presto.parser.Dialect.P, context);
    dle.toDialect(writer);
    var p = writer.toString();
    // console.log(p);
    // parse p source code
    var dlp = parsePString(p);
    context = presto.runtime.Context.newGlobalContext();
    dlp.register(context);
    // rewrite as e
    writer = new presto.utils.CodeWriter(presto.parser.Dialect.E, context);
    dlp.toDialect(writer);
    var actual = writer.toString();
    // console.log(actual);
    // ensure equivalent
    assertEquivalent(test, expected, actual);
    test.done();
};

exports.compareResourceOEO = function(test, resourceName) {
    var expected = getResourceAsString(resourceName);
    // console.log(expected);
    // parse o source code
    var dlo = parseOString(expected);
    var context = presto.runtime.Context.newGlobalContext();
    dlo.register(context);
    // rewrite as e
    var writer = new presto.utils.CodeWriter(presto.parser.Dialect.E, context);
    dlo.toDialect(writer);
    var e = writer.toString();
    // console.log(e);
    // parse e source code
    var dle = parseEString(e);
    context = presto.runtime.Context.newGlobalContext();
    dle.register(context);
    // rewrite as o
    writer = new presto.utils.CodeWriter(presto.parser.Dialect.O, context);
    dle.toDialect(writer);
    var actual = writer.toString();
    // console.log(actual);
    // ensure equivalent
    assertEquivalent(test, expected, actual);
    test.done();
};


exports.compareResourceOPO = function(test, resourceName) {
    var expected = getResourceAsString(resourceName);
    // console.log(expected);
    // parse o source code
    var dlo = parseOString(expected);
    var context = presto.runtime.Context.newGlobalContext();
    dlo.register(context);
    // rewrite as p
    var writer = new presto.utils.CodeWriter(presto.parser.Dialect.P, context);
    dlo.toDialect(writer);
    var p = writer.toString();
    // console.log(p);
    // parse p source code
    var dlp = parsePString(p);
    context = presto.runtime.Context.newGlobalContext();
    dlp.register(context);
    // rewrite as o
    writer = new presto.utils.CodeWriter(presto.parser.Dialect.O, context);
    dlp.toDialect(writer);
    var actual = writer.toString();
    // console.log(actual);
    // ensure equivalent
    assertEquivalent(test, expected, actual);
    test.done();
};
