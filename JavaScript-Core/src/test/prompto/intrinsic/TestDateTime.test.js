var prompto = require("../../../main/prompto/index");
var DateTime = prompto.intrinsic.DateTime;

test('DateWithTZWithNoTZ', () => {
    var s = "2014-10-10T13:18:22.000";
    var dtz = DateTime.parse(s);
    expect(dtz.tzOffset).toEqual( 0);
    expect(dtz.toString()).toEqual( s + "Z");
});

test('DateWithTZWithZ', () => {
    var s = "2014-10-10T13:18:22.000Z";
    var dtz = DateTime.parse(s);
    expect(dtz.tzOffset).toEqual( 0);
    expect(dtz.toString()).toEqual( s);
});

test('DateWithTZWithPlus', () => {
    var s = "2014-10-10T13:18:22.000+0200";
    var dtz = DateTime.parse(s);
    expect(dtz.tzOffset).toEqual( 7200);
    expect(dtz.toString()).toEqual( "2014-10-10T13:18:22.000+02:00");
});

test('DateWithTZWithPlusColon', () => {
    var s = "2014-10-10T13:18:22.000+02:30";
    var dtz = DateTime.parse(s);
    expect(dtz.tzOffset).toEqual( 9000);
    expect(dtz.toString()).toEqual( s);
});

test('DateWithTZWithMinus', () => {
    var s = "2014-10-10T13:18:22.000-0200";
    var dtz = DateTime.parse(s);
    expect(dtz.tzOffset).toEqual( -7200);
    expect(dtz.toString()).toEqual( "2014-10-10T13:18:22.000-02:00");
});

test('DateWithTZWithMinusColon', () => {
    var s = "2014-10-10T13:18:22.000-02:30";
    var dtz = DateTime.parse(s);
    expect(dtz.tzOffset).toEqual( -9000);
    expect(dtz.toString()).toEqual( s);
});
