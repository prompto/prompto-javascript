require("../../../exploded");

var Character = require("./Character").Character;

exports.testIsWhiteSpace = function(test) {
	test.ok(Character.isWhitespace(' '));
	test.ok(Character.isWhitespace('\n'));
	test.ok(!Character.isWhitespace('a'));
	test.ok(!Character.isWhitespace('é'));
	test.done();
};
