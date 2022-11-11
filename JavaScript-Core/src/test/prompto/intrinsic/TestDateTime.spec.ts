import * as assert from "assert";
import {DateTime} from "../../../main/prompto";

it('DateWithTZWithNoTZ', () => {
    const s = "2014-10-10T13:18:22.000";
    const dtz = DateTime.parse(s);
    assert.equal(dtz.tzOffset, 0);
    assert.equal(dtz.toString(), s + "Z");
});

it('DateWithTZWithZ', () => {
    const s = "2014-10-10T13:18:22.000Z";
    const dtz = DateTime.parse(s);
    assert.equal(dtz.tzOffset, 0);
    assert.equal(dtz.toString(), s);
});

it('DateWithTZWithPlus', () => {
    const s = "2014-10-10T13:18:22.000+0200";
    const dtz = DateTime.parse(s);
    assert.equal(dtz.tzOffset, 7200);
    assert.equal(dtz.toString(), "2014-10-10T13:18:22.000+02:00");
});

it('DateWithTZWithPlusColon', () => {
    const s = "2014-10-10T13:18:22.000+02:30";
    const dtz = DateTime.parse(s);
    assert.equal(dtz.tzOffset, 9000);
    assert.equal(dtz.toString(), s);
});

it('DateWithTZWithMinus', () => {
    const s = "2014-10-10T13:18:22.000-0200";
    const dtz = DateTime.parse(s);
    assert.equal(dtz.tzOffset, -7200);
    assert.equal(dtz.toString(), "2014-10-10T13:18:22.000-02:00");
});

it('DateWithTZWithMinusColon', () => {
    const s = "2014-10-10T13:18:22.000-02:30";
    const dtz = DateTime.parse(s);
    assert.equal(dtz.tzOffset, -9000);
    assert.equal(dtz.toString(), s);
});
