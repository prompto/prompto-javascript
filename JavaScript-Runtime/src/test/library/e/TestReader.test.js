var prompto = require("../../../../../JavaScript-Core/src/main/prompto/index.js");
var Out = require("../../../../../JavaScript-Core/src/test/prompto/runtime/utils/Out").Out;
var BaseParserTest = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseParserTest");
var loadDependency = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").loadDependency;
var runInterpretedTests = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").runInterpretedTests;
var runTranspiledTests = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").runTranspiledTests;

beforeEach( () => {
	Out.init();
	BaseParserTest.coreContext = null;
	loadDependency("reader");
	loadDependency("core");
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Json', () => {
	runInterpretedTests('reader/json.pec');
});

test('Transpiled Json', () => {
	runTranspiledTests('reader/json.pec');
});

test('Interpreted Reader', () => {
	runInterpretedTests('reader/reader.pec');
});

test('Transpiled Reader', () => {
	runTranspiledTests('reader/reader.pec');
});

