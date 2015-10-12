exports.testCyclic = function(test) {
	compareResourceESE(test, "lazy/cyclic.pec");
};

exports.testDict = function(test) {
	compareResourceESE(test, "lazy/dict.pec");
};

exports.testList = function(test) {
	compareResourceESE(test, "lazy/list.pec");
};

exports.testSet = function(test) {
	compareResourceESE(test, "lazy/set.pec");
};

exports.testTransient = function(test) {
	compareResourceESE(test, "lazy/transient.pec");
};

