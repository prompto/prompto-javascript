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
		interpretResource("resourceError/badRead.poc", null, null, true);
	}).toThrow(new prompto.error.SyntaxError("Not a resource in method 'main'"));
});


test('BadWrite', () => {
	expect(() => {
		interpretResource("resourceError/badWrite.poc", null, null, true);
	}).toThrow(new prompto.error.SyntaxError("Not a resource in method 'main'"));
});


test('BadResource', () => {
	expect(() => {
		interpretResource("resourceError/badResource.poc", null, null, true);
	}).toThrow(new prompto.error.SyntaxError("Not a resource context in method 'main'"));
});
