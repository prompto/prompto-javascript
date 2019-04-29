var Out = require("../../runtime/utils/Out").Out;
var interpretResource = require("../../parser/BaseEParserTest").interpretResource;
var checkOutput = require("../../parser/BaseEParserTest").checkOutput;
var prompto = require("../../../../main/prompto/index");

beforeEach( () => {
	Out.init();
});

afterEach(() => {
	Out.restore();
});


test('BadRead', () => {
	expect(() => {
        interpretResource("resourceError/badRead.pec");
	}).toThrow(new prompto.error.SyntaxError("Not a resource"));
});


test('BadWrite', () => {
	expect(() => {
        interpretResource("resourceError/badWrite.pec");
	}).toThrow(new prompto.error.SyntaxError("Not a resource"));
});


test('BadResource', () => {
	expect(() => {
        interpretResource("resourceError/badResource.pec");
	}).toThrow(new prompto.error.SyntaxError("Not a resource context"));
});

