var Out = require("../../runtime/utils/Out").Out;
var interpretResource = require("../../parser/BaseEParserTest").interpretResource;
var checkOutput = require("../../parser/BaseEParserTest").checkOutput;
var prompto = require("../../../../main/prompto");

beforeEach( () => {
	Out.init();
});

afterEach(() => {
	Out.restore();
});


test('BadRead', () => {
	expect(() => {
        interpretResource("resourceError/badRead.pec", null, null, true);
	}).toThrow(new prompto.error.SyntaxError("Not a resource in method 'main'"));
});


test('BadWrite', () => {
	expect(() => {
        interpretResource("resourceError/badWrite.pec", null, null, true);
	}).toThrow(new prompto.error.SyntaxError("Not a resource in method 'main'"));
});


test('BadResource', () => {
	expect(() => {
        interpretResource("resourceError/badResource.pec", null, null, true);
	}).toThrow(new prompto.error.SyntaxError("Not a resource context in method 'main'"));
});

