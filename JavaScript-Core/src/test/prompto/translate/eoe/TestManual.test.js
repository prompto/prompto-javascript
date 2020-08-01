var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('Scheduler', () => {
	compareResourceEOE('manual/scheduler.pec');
});

