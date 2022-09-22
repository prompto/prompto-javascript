var prompto = require("../../../main/prompto");
var StrictSet = prompto.intrinsic.StrictSet;
var IntegerValue = prompto.value.IntegerValue;

test('StrictSet has int', () => {
    var set = new StrictSet();
    set.add(1);
    expect(set.has(1)).toBeTruthy();
    expect(set.has(2)).toBeFalsy();
});


test('StrictSet has IntegerValue', () => {
    var set = new StrictSet();
    set.add(new IntegerValue(1));
    expect(set.has(new IntegerValue(1))).toBeTruthy();
    expect(set.has(new IntegerValue(2))).toBeFalsy();
});
