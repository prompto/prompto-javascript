require("../../../exploded");

exports.testRequire = function(test) {
	var parser = require('./CmdLineParser');
	test.ok(parser);
	test.done();
};
