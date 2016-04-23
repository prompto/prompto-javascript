require("../../../exploded");
var utils = require("./Utils");

exports.testUtf8 = function(test) {
    var buffer = utils.stringToUtf8Buffer("Hello!");
    test.ok(buffer);
    var value = utils.utf8BufferToString(buffer);
    test.ok(value);
    test.ok("Hello!"==value);
    test.done();
};
