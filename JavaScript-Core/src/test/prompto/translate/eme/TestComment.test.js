var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('Comment', () => {
	compareResourceEME('comment/comment.pec');
});

