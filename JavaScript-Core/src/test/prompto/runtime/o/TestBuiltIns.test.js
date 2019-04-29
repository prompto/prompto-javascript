var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted DateDayOfMonth', () => {
	checkInterpretedOutput('builtins/dateDayOfMonth.poc');
});

test('Transpiled DateDayOfMonth', () => {
	checkTranspiledOutput('builtins/dateDayOfMonth.poc');
});

test('Interpreted DateDayOfYear', () => {
	checkInterpretedOutput('builtins/dateDayOfYear.poc');
});

test('Transpiled DateDayOfYear', () => {
	checkTranspiledOutput('builtins/dateDayOfYear.poc');
});

test('Interpreted DateMonth', () => {
	checkInterpretedOutput('builtins/dateMonth.poc');
});

test('Transpiled DateMonth', () => {
	checkTranspiledOutput('builtins/dateMonth.poc');
});

test('Interpreted DateTimeDayOfMonth', () => {
	checkInterpretedOutput('builtins/dateTimeDayOfMonth.poc');
});

test('Transpiled DateTimeDayOfMonth', () => {
	checkTranspiledOutput('builtins/dateTimeDayOfMonth.poc');
});

test('Interpreted DateTimeDayOfYear', () => {
	checkInterpretedOutput('builtins/dateTimeDayOfYear.poc');
});

test('Transpiled DateTimeDayOfYear', () => {
	checkTranspiledOutput('builtins/dateTimeDayOfYear.poc');
});

test('Interpreted DateTimeHour', () => {
	checkInterpretedOutput('builtins/dateTimeHour.poc');
});

test('Transpiled DateTimeHour', () => {
	checkTranspiledOutput('builtins/dateTimeHour.poc');
});

test('Interpreted DateTimeMinute', () => {
	checkInterpretedOutput('builtins/dateTimeMinute.poc');
});

test('Transpiled DateTimeMinute', () => {
	checkTranspiledOutput('builtins/dateTimeMinute.poc');
});

test('Interpreted DateTimeMonth', () => {
	checkInterpretedOutput('builtins/dateTimeMonth.poc');
});

test('Transpiled DateTimeMonth', () => {
	checkTranspiledOutput('builtins/dateTimeMonth.poc');
});

test('Interpreted DateTimeSecond', () => {
	checkInterpretedOutput('builtins/dateTimeSecond.poc');
});

test('Transpiled DateTimeSecond', () => {
	checkTranspiledOutput('builtins/dateTimeSecond.poc');
});

test('Interpreted DateTimeYear', () => {
	checkInterpretedOutput('builtins/dateTimeYear.poc');
});

test('Transpiled DateTimeYear', () => {
	checkTranspiledOutput('builtins/dateTimeYear.poc');
});

test('Interpreted DateYear', () => {
	checkInterpretedOutput('builtins/dateYear.poc');
});

test('Transpiled DateYear', () => {
	checkTranspiledOutput('builtins/dateYear.poc');
});

test('Interpreted DictCount', () => {
	checkInterpretedOutput('builtins/dictCount.poc');
});

test('Transpiled DictCount', () => {
	checkTranspiledOutput('builtins/dictCount.poc');
});

test('Interpreted EnumName', () => {
	checkInterpretedOutput('builtins/enumName.poc');
});

test('Transpiled EnumName', () => {
	checkTranspiledOutput('builtins/enumName.poc');
});

test('Interpreted EnumSymbols', () => {
	checkInterpretedOutput('builtins/enumSymbols.poc');
});

test('Transpiled EnumSymbols', () => {
	checkTranspiledOutput('builtins/enumSymbols.poc');
});

test('Interpreted EnumValue', () => {
	checkInterpretedOutput('builtins/enumValue.poc');
});

test('Transpiled EnumValue', () => {
	checkTranspiledOutput('builtins/enumValue.poc');
});

test('Interpreted IntegerFormat', () => {
	checkInterpretedOutput('builtins/integerFormat.poc');
});

test('Transpiled IntegerFormat', () => {
	checkTranspiledOutput('builtins/integerFormat.poc');
});

test('Interpreted ListCount', () => {
	checkInterpretedOutput('builtins/listCount.poc');
});

test('Transpiled ListCount', () => {
	checkTranspiledOutput('builtins/listCount.poc');
});

test('Interpreted SetCount', () => {
	checkInterpretedOutput('builtins/setCount.poc');
});

test('Transpiled SetCount', () => {
	checkTranspiledOutput('builtins/setCount.poc');
});

test('Interpreted TextCapitalize', () => {
	checkInterpretedOutput('builtins/textCapitalize.poc');
});

test('Transpiled TextCapitalize', () => {
	checkTranspiledOutput('builtins/textCapitalize.poc');
});

test('Interpreted TextCount', () => {
	checkInterpretedOutput('builtins/textCount.poc');
});

test('Transpiled TextCount', () => {
	checkTranspiledOutput('builtins/textCount.poc');
});

test('Interpreted TextIndexOf', () => {
	checkInterpretedOutput('builtins/textIndexOf.poc');
});

test('Transpiled TextIndexOf', () => {
	checkTranspiledOutput('builtins/textIndexOf.poc');
});

test('Interpreted TextLowercase', () => {
	checkInterpretedOutput('builtins/textLowercase.poc');
});

test('Transpiled TextLowercase', () => {
	checkTranspiledOutput('builtins/textLowercase.poc');
});

test('Interpreted TextReplace', () => {
	checkInterpretedOutput('builtins/textReplace.poc');
});

test('Transpiled TextReplace', () => {
	checkTranspiledOutput('builtins/textReplace.poc');
});

test('Interpreted TextReplaceAll', () => {
	checkInterpretedOutput('builtins/textReplaceAll.poc');
});

test('Transpiled TextReplaceAll', () => {
	checkTranspiledOutput('builtins/textReplaceAll.poc');
});

test('Interpreted TextSplit', () => {
	checkInterpretedOutput('builtins/textSplit.poc');
});

test('Transpiled TextSplit', () => {
	checkTranspiledOutput('builtins/textSplit.poc');
});

test('Interpreted TextTrim', () => {
	checkInterpretedOutput('builtins/textTrim.poc');
});

test('Transpiled TextTrim', () => {
	checkTranspiledOutput('builtins/textTrim.poc');
});

test('Interpreted TextUppercase', () => {
	checkInterpretedOutput('builtins/textUppercase.poc');
});

test('Transpiled TextUppercase', () => {
	checkTranspiledOutput('builtins/textUppercase.poc');
});

test('Interpreted TimeHour', () => {
	checkInterpretedOutput('builtins/timeHour.poc');
});

test('Transpiled TimeHour', () => {
	checkTranspiledOutput('builtins/timeHour.poc');
});

test('Interpreted TimeMinute', () => {
	checkInterpretedOutput('builtins/timeMinute.poc');
});

test('Transpiled TimeMinute', () => {
	checkTranspiledOutput('builtins/timeMinute.poc');
});

test('Interpreted TimeSecond', () => {
	checkInterpretedOutput('builtins/timeSecond.poc');
});

test('Transpiled TimeSecond', () => {
	checkTranspiledOutput('builtins/timeSecond.poc');
});

test('Interpreted TupleCount', () => {
	checkInterpretedOutput('builtins/tupleCount.poc');
});

test('Transpiled TupleCount', () => {
	checkTranspiledOutput('builtins/tupleCount.poc');
});

