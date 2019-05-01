var Encoder = require("../../main/prompto/internet/Html");

test('Encode', () => {
    var encoded = Encoder.htmlEncode("a<b");
    expect(encoded).toEqual("a&lt;b");
});


test('Decode', () => {
    var decoded = Encoder.htmlDecode("a&lt;b");
    expect(decoded).toEqual("a<b");
});


