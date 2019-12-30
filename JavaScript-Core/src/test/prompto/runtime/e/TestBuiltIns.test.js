var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted BooleanText', () => {
	checkInterpretedOutput('builtins/booleanText.pec');
});

test('Transpiled BooleanText', () => {
	checkTranspiledOutput('builtins/booleanText.pec');
});

test('Interpreted CategoryCategory', () => {
	checkInterpretedOutput('builtins/categoryCategory.pec');
});

test('Transpiled CategoryCategory', () => {
	checkTranspiledOutput('builtins/categoryCategory.pec');
});

test('Interpreted CategoryText', () => {
	checkInterpretedOutput('builtins/categoryText.pec');
});

test('Transpiled CategoryText', () => {
	checkTranspiledOutput('builtins/categoryText.pec');
});

test('Interpreted CharCodePoint', () => {
	checkInterpretedOutput('builtins/charCodePoint.pec');
});

test('Transpiled CharCodePoint', () => {
	checkTranspiledOutput('builtins/charCodePoint.pec');
});

test('Interpreted CharText', () => {
	checkInterpretedOutput('builtins/charText.pec');
});

test('Transpiled CharText', () => {
	checkTranspiledOutput('builtins/charText.pec');
});

test('Interpreted CursorToList', () => {
	checkInterpretedOutput('builtins/cursorToList.pec');
});

test('Transpiled CursorToList', () => {
	checkTranspiledOutput('builtins/cursorToList.pec');
});

test('Interpreted DateDayOfMonth', () => {
	checkInterpretedOutput('builtins/dateDayOfMonth.pec');
});

test('Transpiled DateDayOfMonth', () => {
	checkTranspiledOutput('builtins/dateDayOfMonth.pec');
});

test('Interpreted DateDayOfYear', () => {
	checkInterpretedOutput('builtins/dateDayOfYear.pec');
});

test('Transpiled DateDayOfYear', () => {
	checkTranspiledOutput('builtins/dateDayOfYear.pec');
});

test('Interpreted DateMonth', () => {
	checkInterpretedOutput('builtins/dateMonth.pec');
});

test('Transpiled DateMonth', () => {
	checkTranspiledOutput('builtins/dateMonth.pec');
});

test('Interpreted DateText', () => {
	checkInterpretedOutput('builtins/dateText.pec');
});

test('Transpiled DateText', () => {
	checkTranspiledOutput('builtins/dateText.pec');
});

test('Interpreted DateTimeDate', () => {
	checkInterpretedOutput('builtins/dateTimeDate.pec');
});

test('Transpiled DateTimeDate', () => {
	checkTranspiledOutput('builtins/dateTimeDate.pec');
});

test('Interpreted DateTimeDayOfMonth', () => {
	checkInterpretedOutput('builtins/dateTimeDayOfMonth.pec');
});

test('Transpiled DateTimeDayOfMonth', () => {
	checkTranspiledOutput('builtins/dateTimeDayOfMonth.pec');
});

test('Interpreted DateTimeDayOfYear', () => {
	checkInterpretedOutput('builtins/dateTimeDayOfYear.pec');
});

test('Transpiled DateTimeDayOfYear', () => {
	checkTranspiledOutput('builtins/dateTimeDayOfYear.pec');
});

test('Interpreted DateTimeHour', () => {
	checkInterpretedOutput('builtins/dateTimeHour.pec');
});

test('Transpiled DateTimeHour', () => {
	checkTranspiledOutput('builtins/dateTimeHour.pec');
});

test('Interpreted DateTimeMilli', () => {
	checkInterpretedOutput('builtins/dateTimeMilli.pec');
});

test('Transpiled DateTimeMilli', () => {
	checkTranspiledOutput('builtins/dateTimeMilli.pec');
});

test('Interpreted DateTimeMinute', () => {
	checkInterpretedOutput('builtins/dateTimeMinute.pec');
});

test('Transpiled DateTimeMinute', () => {
	checkTranspiledOutput('builtins/dateTimeMinute.pec');
});

test('Interpreted DateTimeMonth', () => {
	checkInterpretedOutput('builtins/dateTimeMonth.pec');
});

test('Transpiled DateTimeMonth', () => {
	checkTranspiledOutput('builtins/dateTimeMonth.pec');
});

test('Interpreted DateTimeSecond', () => {
	checkInterpretedOutput('builtins/dateTimeSecond.pec');
});

test('Transpiled DateTimeSecond', () => {
	checkTranspiledOutput('builtins/dateTimeSecond.pec');
});

test('Interpreted DateTimeText', () => {
	checkInterpretedOutput('builtins/dateTimeText.pec');
});

test('Transpiled DateTimeText', () => {
	checkTranspiledOutput('builtins/dateTimeText.pec');
});

test('Interpreted DateTimeTime', () => {
	checkInterpretedOutput('builtins/dateTimeTime.pec');
});

test('Transpiled DateTimeTime', () => {
	checkTranspiledOutput('builtins/dateTimeTime.pec');
});

test('Interpreted DateTimeYear', () => {
	checkInterpretedOutput('builtins/dateTimeYear.pec');
});

test('Transpiled DateTimeYear', () => {
	checkTranspiledOutput('builtins/dateTimeYear.pec');
});

test('Interpreted DateYear', () => {
	checkInterpretedOutput('builtins/dateYear.pec');
});

test('Transpiled DateYear', () => {
	checkTranspiledOutput('builtins/dateYear.pec');
});

test('Interpreted DecimalText', () => {
	checkInterpretedOutput('builtins/decimalText.pec');
});

test('Transpiled DecimalText', () => {
	checkTranspiledOutput('builtins/decimalText.pec');
});

test('Interpreted DictCount', () => {
	checkInterpretedOutput('builtins/dictCount.pec');
});

test('Transpiled DictCount', () => {
	checkTranspiledOutput('builtins/dictCount.pec');
});

test('Interpreted DictKeys', () => {
	checkInterpretedOutput('builtins/dictKeys.pec');
});

test('Transpiled DictKeys', () => {
	checkTranspiledOutput('builtins/dictKeys.pec');
});

test('Interpreted DictText', () => {
	checkInterpretedOutput('builtins/dictText.pec');
});

test('Transpiled DictText', () => {
	checkTranspiledOutput('builtins/dictText.pec');
});

test('Interpreted DictValues', () => {
	checkInterpretedOutput('builtins/dictValues.pec');
});

test('Transpiled DictValues', () => {
	checkTranspiledOutput('builtins/dictValues.pec');
});

test('Interpreted DocumentText', () => {
	checkInterpretedOutput('builtins/documentText.pec');
});

test('Transpiled DocumentText', () => {
	checkTranspiledOutput('builtins/documentText.pec');
});

test('Interpreted EnumName', () => {
	checkInterpretedOutput('builtins/enumName.pec');
});

test('Transpiled EnumName', () => {
	checkTranspiledOutput('builtins/enumName.pec');
});

test('Interpreted EnumSymbols', () => {
	checkInterpretedOutput('builtins/enumSymbols.pec');
});

test('Transpiled EnumSymbols', () => {
	checkTranspiledOutput('builtins/enumSymbols.pec');
});

test('Interpreted EnumValue', () => {
	checkInterpretedOutput('builtins/enumValue.pec');
});

test('Transpiled EnumValue', () => {
	checkTranspiledOutput('builtins/enumValue.pec');
});

test('Interpreted IntegerFormat', () => {
	checkInterpretedOutput('builtins/integerFormat.pec');
});

test('Transpiled IntegerFormat', () => {
	checkTranspiledOutput('builtins/integerFormat.pec');
});

test('Interpreted IntegerText', () => {
	checkInterpretedOutput('builtins/integerText.pec');
});

test('Transpiled IntegerText', () => {
	checkTranspiledOutput('builtins/integerText.pec');
});

test('Interpreted ListCount', () => {
	checkInterpretedOutput('builtins/listCount.pec');
});

test('Transpiled ListCount', () => {
	checkTranspiledOutput('builtins/listCount.pec');
});

test('Interpreted ListText', () => {
	checkInterpretedOutput('builtins/listText.pec');
});

test('Transpiled ListText', () => {
	checkTranspiledOutput('builtins/listText.pec');
});

test('Interpreted PeriodText', () => {
	checkInterpretedOutput('builtins/periodText.pec');
});

test('Transpiled PeriodText', () => {
	checkTranspiledOutput('builtins/periodText.pec');
});

test('Interpreted SetCount', () => {
	checkInterpretedOutput('builtins/setCount.pec');
});

test('Transpiled SetCount', () => {
	checkTranspiledOutput('builtins/setCount.pec');
});

test('Interpreted SetText', () => {
	checkInterpretedOutput('builtins/setText.pec');
});

test('Transpiled SetText', () => {
	checkTranspiledOutput('builtins/setText.pec');
});

test('Interpreted TextCapitalize', () => {
	checkInterpretedOutput('builtins/textCapitalize.pec');
});

test('Transpiled TextCapitalize', () => {
	checkTranspiledOutput('builtins/textCapitalize.pec');
});

test('Interpreted TextCount', () => {
	checkInterpretedOutput('builtins/textCount.pec');
});

test('Transpiled TextCount', () => {
	checkTranspiledOutput('builtins/textCount.pec');
});

test('Interpreted TextEndsWith', () => {
	checkInterpretedOutput('builtins/textEndsWith.pec');
});

test('Transpiled TextEndsWith', () => {
	checkTranspiledOutput('builtins/textEndsWith.pec');
});

test('Interpreted TextLowercase', () => {
	checkInterpretedOutput('builtins/textLowercase.pec');
});

test('Transpiled TextLowercase', () => {
	checkTranspiledOutput('builtins/textLowercase.pec');
});

test('Interpreted TextReplace', () => {
	checkInterpretedOutput('builtins/textReplace.pec');
});

test('Transpiled TextReplace', () => {
	checkTranspiledOutput('builtins/textReplace.pec');
});

test('Interpreted TextReplaceAll', () => {
	checkInterpretedOutput('builtins/textReplaceAll.pec');
});

test('Transpiled TextReplaceAll', () => {
	checkTranspiledOutput('builtins/textReplaceAll.pec');
});

test('Interpreted TextSplit', () => {
	checkInterpretedOutput('builtins/textSplit.pec');
});

test('Transpiled TextSplit', () => {
	checkTranspiledOutput('builtins/textSplit.pec');
});

test('Interpreted TextStartsWith', () => {
	checkInterpretedOutput('builtins/textStartsWith.pec');
});

test('Transpiled TextStartsWith', () => {
	checkTranspiledOutput('builtins/textStartsWith.pec');
});

test('Interpreted TextText', () => {
	checkInterpretedOutput('builtins/textText.pec');
});

test('Transpiled TextText', () => {
	checkTranspiledOutput('builtins/textText.pec');
});

test('Interpreted TextTrim', () => {
	checkInterpretedOutput('builtins/textTrim.pec');
});

test('Transpiled TextTrim', () => {
	checkTranspiledOutput('builtins/textTrim.pec');
});

test('Interpreted TextUppercase', () => {
	checkInterpretedOutput('builtins/textUppercase.pec');
});

test('Transpiled TextUppercase', () => {
	checkTranspiledOutput('builtins/textUppercase.pec');
});

test('Interpreted TimeHour', () => {
	checkInterpretedOutput('builtins/timeHour.pec');
});

test('Transpiled TimeHour', () => {
	checkTranspiledOutput('builtins/timeHour.pec');
});

test('Interpreted TimeMilli', () => {
	checkInterpretedOutput('builtins/timeMilli.pec');
});

test('Transpiled TimeMilli', () => {
	checkTranspiledOutput('builtins/timeMilli.pec');
});

test('Interpreted TimeMinute', () => {
	checkInterpretedOutput('builtins/timeMinute.pec');
});

test('Transpiled TimeMinute', () => {
	checkTranspiledOutput('builtins/timeMinute.pec');
});

test('Interpreted TimeSecond', () => {
	checkInterpretedOutput('builtins/timeSecond.pec');
});

test('Transpiled TimeSecond', () => {
	checkTranspiledOutput('builtins/timeSecond.pec');
});

test('Interpreted TimeText', () => {
	checkInterpretedOutput('builtins/timeText.pec');
});

test('Transpiled TimeText', () => {
	checkTranspiledOutput('builtins/timeText.pec');
});

test('Interpreted TupleCount', () => {
	checkInterpretedOutput('builtins/tupleCount.pec');
});

test('Transpiled TupleCount', () => {
	checkTranspiledOutput('builtins/tupleCount.pec');
});

test('Interpreted TupleText', () => {
	checkInterpretedOutput('builtins/tupleText.pec');
});

test('Transpiled TupleText', () => {
	checkTranspiledOutput('builtins/tupleText.pec');
});

test('Interpreted UuidText', () => {
	checkInterpretedOutput('builtins/uuidText.pec');
});

test('Transpiled UuidText', () => {
	checkTranspiledOutput('builtins/uuidText.pec');
});

