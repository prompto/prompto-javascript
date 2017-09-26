var Encoder = require("../../main/prompto/internet/Html");

exports.testEncode = function(test) {
    var encoded = Encoder.htmlEncode("a<b");
    test.ok("a&lt;b"==encoded);
    test.done();
};


exports.testDecode = function(test) {
    var decoded = Encoder.htmlDecode("a&lt;b");
    test.ok("a<b"==decoded);
    test.done();
};


