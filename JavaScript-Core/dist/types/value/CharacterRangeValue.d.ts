import RangeValue from './RangeValue';
import { CharacterValue } from '../value';
import { Context } from "../runtime";
import IValue from "./IValue";
export default class CharacterRangeValue extends RangeValue<CharacterValue> {
    constructor(left: CharacterValue, right: CharacterValue);
    size(): number;
    hasItem(context: Context, value: IValue): boolean;
    getItem(index: number): CharacterValue;
    newInstance(first: CharacterValue, last: CharacterValue): RangeValue<CharacterValue>;
}
