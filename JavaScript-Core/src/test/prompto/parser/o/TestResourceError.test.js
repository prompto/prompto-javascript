var Out = require("../../runtime/utils/Out").Out;
var interpretResource = require("../../parser/BaseOParserTest").interpretResource;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;
var prompto = require("../../../../main/prompto/index");

beforeEach( () => {
	Out.init();
});

afterEach(() => {
	Out.restore();
});


test('BadRead', () => {
	expect(() => {
		interpretResource("resourceError/badRead.poc");
	}).toThrow(new prompto.error.SyntaxError("Not a resource"));
});


test('BadWrite', () => {
	expect(() => {
		interpretResource("resourceError/badWrite.poc");
	}).toThrow(new prompto.error.SyntaxError("Not a resource"));
});


test('BadResource', () => {
	expect(() => {
		interpretResource("resourceError/badResource.poc");
	}).toThrow(new prompto.error.SyntaxError("Not a resource context"));
});
