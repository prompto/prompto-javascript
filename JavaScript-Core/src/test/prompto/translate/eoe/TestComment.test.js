var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('Comment', () => {
	compareResourceEOE('comment/comment.pec');
});

