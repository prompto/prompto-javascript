exports.testGlobalClosureNoArg = function(test) {
	compareResourceESE(test, "closures/globalClosureNoArg.pec");
};

exports.testGlobalClosureWithArg = function(test) {
	compareResourceESE(test, "closures/globalClosureWithArg.pec");
};

exports.testInstanceClosureNoArg = function(test) {
	compareResourceESE(test, "closures/instanceClosureNoArg.pec");
};

