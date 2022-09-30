import NativeType from './NativeType'
import { Identifier } from '../grammar'
import {Context} from "../runtime";
import {Type} from "../intrinsic";
import {TypeFamily} from "../store";

export default class MissingType extends NativeType {

    static instance = new MissingType();
    constructor() {
        super(new Identifier("*"), TypeFamily.MISSING);
    }

    isAssignableFrom(context: Context, other: Type): boolean {
        return true;
    }
}
