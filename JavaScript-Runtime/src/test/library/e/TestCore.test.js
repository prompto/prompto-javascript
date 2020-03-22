var prompto = require("../../../../../JavaScript-Core/src/main/prompto/index.js");
var Out = require("../../../../../JavaScript-Core/src/test/prompto/runtime/utils/Out").Out;
var BaseParserTest = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseParserTest");
var loadDependency = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").loadDependency;
var runInterpretedTests = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").runInterpretedTests;
var runTranspiledTests = require("../../../../../JavaScript-Core/src/test/prompto/parser/BaseEParserTest").runTranspiledTests;

beforeEach( () => {
	Out.init();
	BaseParserTest.coreContext = null;
	loadDependency("core");
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Abstract', () => {
	runInterpretedTests('core/abstract.pec');
});

test('Transpiled Abstract', () => {
	runTranspiledTests('core/abstract.pec');
});

test('Interpreted Any', () => {
	runInterpretedTests('core/any.pec');
});

test('Transpiled Any', () => {
	runTranspiledTests('core/any.pec');
});

test('Interpreted Attribute', () => {
	runInterpretedTests('core/attribute.pec');
});

test('Interpreted Attributes', () => {
	runInterpretedTests('core/attributes.pec');
});

test('Transpiled Attributes', () => {
	runTranspiledTests('core/attributes.pec');
});

test('Interpreted Category', () => {
	runInterpretedTests('core/category.pec');
});

test('Transpiled Category', () => {
	runTranspiledTests('core/category.pec');
});

test('Interpreted Cloud', () => {
	runInterpretedTests('core/cloud.pec');
});

test('Transpiled Cloud', () => {
	runTranspiledTests('core/cloud.pec');
});

test('Interpreted Config', () => {
	runInterpretedTests('core/config.pec');
});

test('Transpiled Config', () => {
	runTranspiledTests('core/config.pec');
});

test('Interpreted Error', () => {
	runInterpretedTests('core/error.pec');
});

test('Transpiled Error', () => {
	runTranspiledTests('core/error.pec');
});

test('Interpreted Math', () => {
	runInterpretedTests('core/math.pec');
});

test('Transpiled Math', () => {
	runTranspiledTests('core/math.pec');
});

test('Interpreted Parse', () => {
	runInterpretedTests('core/parse.pec');
});

test('Transpiled Parse', () => {
	runTranspiledTests('core/parse.pec');
});

test('Interpreted Time', () => {
	runInterpretedTests('core/time.pec');
});

test('Transpiled Time', () => {
	runTranspiledTests('core/time.pec');
});

test('Interpreted Utils', () => {
	runInterpretedTests('core/utils.pec');
});

test('Transpiled Utils', () => {
	runTranspiledTests('core/utils.pec');
});

