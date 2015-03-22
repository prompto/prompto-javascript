require("../../../exploded");
var CmdLineParser = require("./CmdLineParser").CmdLineParser;
var assert = require("assert");

/*jshint sub:true*/
exports.testNull = function(test) {
	var options = CmdLineParser.parse(null);
	test.ok(options);
    test.done();
}

exports.testEmpty = function(test) {
	var options = CmdLineParser.parse("");
	test.ok(options);
    test.done();
}

exports.testKVP1 = function(test) {
	var options = CmdLineParser.parse("a=b");
	test.equal("b",options["a"]);
	test.done();
};

exports.testKVP2 = function(test) {
	var options = CmdLineParser.parse("a = b");
	test.equal("b",options["a"]);
	test.done();
};

exports.testKVP3 = function(test) {
	var options = CmdLineParser.parse("-a=b");
	test.equal("b",options["a"]);
	test.done();
};

exports.testKVP4 = function(test) {
	var options = CmdLineParser.parse("123=444");
	test.equal("444",options["123"]);
	test.done();
};

exports.testKVP5 = function(test) {
	var options = CmdLineParser.parse("-a=b c=d e=f");
	test.equal("b",options["a"]);
	test.equal("d",options["c"]);
	test.equal("f",options["e"]);
	test.done();
};

exports.testKVP6 = function(test) {
	var options = CmdLineParser.parse("123=\"444 -qlsdkj ==22\"");
	test.equal("444 -qlsdkj ==22",options["123"]);
	test.done();
};

