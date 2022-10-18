import * as assert from "assert";
import StrictSet from "../../../generated/prompto/intrinsic/StrictSet.js";
import { IntegerValue } from "../../../generated/prompto/value";


it('StrictSet has int', () => {
    var set = new StrictSet();
    set.add(1);
    assert(set.has(1));
    assert(!set.has(2));
});


it('StrictSet has IntegerValue', () => {
    var set = new StrictSet();
    set.add(new IntegerValue(1));
    assert(set.has(new IntegerValue(1)));
    assert(!set.has(new IntegerValue(2)));
});
