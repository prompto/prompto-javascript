var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('Scheduler', () => {
	compareResourceEME('manual/scheduler.pec');
});

