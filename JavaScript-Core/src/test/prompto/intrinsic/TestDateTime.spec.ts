import test from 'node:test';
import * as assert from "assert";
import DateTime from "../../../main/prompto/intrinsic/DateTime.js";

test('DateWithTZWithNoTZ', () => {
    const s = "2014-10-10T13:18:22.000";
    const dtz = DateTime.parse(s);
    assert.equal(dtz.tzOffset, 0);
    assert.equal(dtz.toString(), s + "Z");
});

test('DateWithTZWithZ', () => {
    const s = "2014-10-10T13:18:22.000Z";
    const dtz = DateTime.parse(s);
    assert.equal(dtz.tzOffset, 0);
    assert.equal(dtz.toString(), s);
});

test('DateWithTZWithPlus', () => {
    const s = "2014-10-10T13:18:22.000+0200";
    const dtz = DateTime.parse(s);
    assert.equal(dtz.tzOffset, 7200);
    assert.equal(dtz.toString(), "2014-10-10T13:18:22.000+02:00");
});

test('DateWithTZWithPlusColon', () => {
    const s = "2014-10-10T13:18:22.000+02:30";
    const dtz = DateTime.parse(s);
    assert.equal(dtz.tzOffset, 9000);
    assert.equal(dtz.toString(), s);
});

test('DateWithTZWithMinus', () => {
    const s = "2014-10-10T13:18:22.000-0200";
    const dtz = DateTime.parse(s);
    assert.equal(dtz.tzOffset, -7200);
    assert.equal(dtz.toString(), "2014-10-10T13:18:22.000-02:00");
});

test('DateWithTZWithMinusColon', () => {
    const s = "2014-10-10T13:18:22.000-02:30";
    const dtz = DateTime.parse(s);
    assert.equal(dtz.tzOffset, -9000);
    assert.equal(dtz.toString(), s);
});
