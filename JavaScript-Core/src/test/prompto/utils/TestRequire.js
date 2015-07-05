require("../../../exploded");

exports.testRequire = function(test) {
	var parser = require('./ArgsParser');
	test.ok(parser);
	test.done();
};
