var prompto = require("../../../../../JavaScript-Core/src/main/prompto/index.js");
var Out = require("../../../../../JavaScript-Core/src/test/prompto/runtime/utils/Out").Out;
var BaseParserTest = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseParserTest");
var loadDependency = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").loadDependency;
var runInterpretedTests = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").runInterpretedTests;
var runTranspiledTests = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").runTranspiledTests;

beforeEach( () => {
	Out.init();
	BaseParserTest.coreContext = null;
	loadDependency("internet");
	loadDependency("console");
	loadDependency("core");
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Html', () => {
	runInterpretedTests('internet/html.pec');
});

test('Transpiled Html', () => {
	runTranspiledTests('internet/html.pec');
});

test('Interpreted Url', () => {
	runInterpretedTests('internet/url.pec');
});

test('Transpiled Url', () => {
	runTranspiledTests('internet/url.pec');
});

