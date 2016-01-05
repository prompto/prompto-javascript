require("../../../exploded");
var DateTime = require("./DateTime").DateTime;
require("./DateTime").resolve();

exports.testDateWithTZWithNoTZ = function(test) {
    var s = "2014-10-10T13:18:22.000";
    var dtz = DateTime.Parse(s);
    test.equal(dtz.tzOffset, 0);
    test.equal(dtz.toString(), s + "Z");
	test.done();
};

exports.testDateWithTZWithZ = function(test) {
    var s = "2014-10-10T13:18:22.000Z";
    var dtz = DateTime.Parse(s);
    test.equal(dtz.tzOffset, 0);
    test.equal(dtz.toString(), s);
    test.done();
};

exports.testDateWithTZWithPlus = function(test) {
    var s = "2014-10-10T13:18:22.000+0200";
    var dtz = DateTime.Parse(s);
    test.equal(dtz.tzOffset, 7200);
    test.equal(dtz.toString(), "2014-10-10T13:18:22.000+02:00");
    test.done();
};

exports.testDateWithTZWithPlusColon = function(test) {
    var s = "2014-10-10T13:18:22.000+02:30";
    var dtz = DateTime.Parse(s);
    test.equal(dtz.tzOffset, 9000);
    test.equal(dtz.toString(), s);
    test.done();
};

exports.testDateWithTZWithMinus = function(test) {
    var s = "2014-10-10T13:18:22.000-0200";
    var dtz = DateTime.Parse(s);
    test.equal(dtz.tzOffset, -7200);
    test.equal(dtz.toString(), "2014-10-10T13:18:22.000-02:00");
    test.done();
};

exports.testDateWithTZWithMinusColon = function(test) {
    var s = "2014-10-10T13:18:22.000-02:30";
    var dtz = DateTime.Parse(s);
    test.equal(dtz.tzOffset, -9000);
    test.equal(dtz.toString(), s);
    test.done();
};
