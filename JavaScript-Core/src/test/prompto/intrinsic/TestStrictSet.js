require("../../../exploded");
var StrictSet = require("./StrictSet").StrictSet;
var IntegerModule = require("../value/IntegerValue");
IntegerModule.resolve();
var IntegerValue = IntegerModule.IntegerValue;

exports.testHasInt = function(test) {
    var set = new StrictSet();
    set.add(1);
    test.ok(set.has(1));
    test.ok(!set.has(2));
    test.done();
};


exports.testHasIntegerValue = function(test) {
    var set = new StrictSet();
    set.add(new IntegerValue(1));
    test.ok(set.has(new IntegerValue(1)));
    test.ok(!set.has(new IntegerValue(2)));
    test.done();
};
