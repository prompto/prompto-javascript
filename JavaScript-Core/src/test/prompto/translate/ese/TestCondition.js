exports.testComplexIf = function(test) {
	compareResourceESE(test, "condition/complexIf.pec");
};

exports.testElseIf = function(test) {
	compareResourceESE(test, "condition/elseIf.pec");
};

exports.testReturnIf = function(test) {
	compareResourceESE(test, "condition/returnIf.pec");
};

exports.testSimpleIf = function(test) {
	compareResourceESE(test, "condition/simpleIf.pec");
};

exports.testSwitch = function(test) {
	compareResourceESE(test, "condition/switch.pec");
};

exports.testTernary = function(test) {
	compareResourceESE(test, "condition/ternary.pec");
};

