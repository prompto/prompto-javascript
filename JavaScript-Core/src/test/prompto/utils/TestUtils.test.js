var prompto = require("../../../main/prompto/index");
var utils = prompto.utils;

test('testUtf8', () => {
    var buffer = utils.stringToUtf8Buffer("Hello!");
    expect(buffer).not.toBeNull();
    var value = utils.utf8BufferToString(buffer);
    expect(value).not.toBeNull();
    expect(value).toEqual("Hello!");
});
