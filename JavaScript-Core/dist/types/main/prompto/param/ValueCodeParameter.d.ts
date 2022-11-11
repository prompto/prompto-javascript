import { CodeParameter } from "./index";
import { CodeValue } from "../value";
import { Identifier } from "../grammar";
export default class ValueCodeParameter extends CodeParameter {
    value: CodeValue;
    constructor(id: Identifier, value: CodeValue);
}
