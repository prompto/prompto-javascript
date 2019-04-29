var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted CategoryEnum', () => {
	checkInterpretedOutput('enums/categoryEnum.pec');
});

test('Transpiled CategoryEnum', () => {
	checkTranspiledOutput('enums/categoryEnum.pec');
});

test('Interpreted IntegerEnum', () => {
	checkInterpretedOutput('enums/integerEnum.pec');
});

test('Transpiled IntegerEnum', () => {
	checkTranspiledOutput('enums/integerEnum.pec');
});

test('Interpreted StoreCategoryEnum', () => {
	checkInterpretedOutput('enums/storeCategoryEnum.pec');
});

test('Transpiled StoreCategoryEnum', () => {
	checkTranspiledOutput('enums/storeCategoryEnum.pec');
});

test('Interpreted StoreIntegerEnum', () => {
	checkInterpretedOutput('enums/storeIntegerEnum.pec');
});

test('Transpiled StoreIntegerEnum', () => {
	checkTranspiledOutput('enums/storeIntegerEnum.pec');
});

test('Interpreted StoreTextEnum', () => {
	checkInterpretedOutput('enums/storeTextEnum.pec');
});

test('Transpiled StoreTextEnum', () => {
	checkTranspiledOutput('enums/storeTextEnum.pec');
});

test('Interpreted TextEnum', () => {
	checkInterpretedOutput('enums/textEnum.pec');
});

test('Transpiled TextEnum', () => {
	checkTranspiledOutput('enums/textEnum.pec');
});

test('Interpreted TextEnumArg', () => {
	checkInterpretedOutput('enums/textEnumArg.pec');
});

test('Transpiled TextEnumArg', () => {
	checkTranspiledOutput('enums/textEnumArg.pec');
});

test('Interpreted TextEnumVar', () => {
	checkInterpretedOutput('enums/textEnumVar.pec');
});

test('Transpiled TextEnumVar', () => {
	checkTranspiledOutput('enums/textEnumVar.pec');
});

