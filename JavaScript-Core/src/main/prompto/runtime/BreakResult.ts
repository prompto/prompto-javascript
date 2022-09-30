import BaseValue from "../value/BaseValue";
import {VoidType} from "../type";

export default class BreakResult extends BaseValue<any> {

    static instance = new BreakResult();

    constructor() {
        super(VoidType.instance, null);
    }
}

