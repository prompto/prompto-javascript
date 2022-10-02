import BaseValue from "../value/BaseValue";
import {VoidType} from "../type";

export default class VoidResult extends BaseValue<void> {
    static instance = new VoidResult(VoidType.instance);
}
