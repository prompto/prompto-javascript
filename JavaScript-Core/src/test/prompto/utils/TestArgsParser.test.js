var prompto = require("../../../main/prompto");
var CmdLineParser = prompto.utils.CmdLineParser;
var assert = require("assert");

/*jshint sub:true*/
test('Null', () => {
	var options = CmdLineParser.parse(null);
	expect(options).not.toBeNull();
});

test('Empty', () => {
	var options = CmdLineParser.parse("");
	expect(options).not.toBeNull();
});

test('KVP1', () => {
	var options = CmdLineParser.parse("a=b");
	expect(options["a"]).toEqual("b");
});

test('KVP2', () => {
	var options = CmdLineParser.parse("a = b");
	expect(options["a"]).toEqual("b");
});

test('KVP3', () => {
	var options = CmdLineParser.parse("-a=b");
	expect(options["a"]).toEqual("b");
});

test('KVP4', () => {
	var options = CmdLineParser.parse("123=444");
	expect(options["123"]).toEqual("444");
});

test('KVP5', () => {
	var options = CmdLineParser.parse("-a=b c=d e=f");
	expect(options["a"]).toEqual("b");
	expect(options["c"]).toEqual("d");
	expect(options["e"]).toEqual("f");
});

test('KVP6', () => {
	var options = CmdLineParser.parse("123=\"444 -qlsdkj ==22\"");
	expect(options["123"]).toEqual("444 -qlsdkj ==22");
});

