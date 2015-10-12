exports.testDivideByZero = function(test) {
	compareResourceESE(test, "errors/divideByZero.pec");
};

exports.testIndexOutOfRange_listItem = function(test) {
	compareResourceESE(test, "errors/indexOutOfRange-listItem.pec");
};

exports.testIndexOutOfRange_sliceList = function(test) {
	compareResourceESE(test, "errors/indexOutOfRange-sliceList.pec");
};

exports.testIndexOutOfRange_sliceRange = function(test) {
	compareResourceESE(test, "errors/indexOutOfRange-sliceRange.pec");
};

exports.testIndexOutOfRange_sliceText = function(test) {
	compareResourceESE(test, "errors/indexOutOfRange-sliceText.pec");
};

exports.testNullDict = function(test) {
	compareResourceESE(test, "errors/nullDict.pec");
};

exports.testNullItem = function(test) {
	compareResourceESE(test, "errors/nullItem.pec");
};

exports.testNullKey = function(test) {
	compareResourceESE(test, "errors/nullKey.pec");
};

exports.testNullMember = function(test) {
	compareResourceESE(test, "errors/nullMember.pec");
};

exports.testNullMethod = function(test) {
	compareResourceESE(test, "errors/nullMethod.pec");
};

exports.testUnexpected = function(test) {
	compareResourceESE(test, "errors/unexpected.pec");
};

exports.testUserException = function(test) {
	compareResourceESE(test, "errors/userException.pec");
};

