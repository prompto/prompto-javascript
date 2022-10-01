import NativeType from './NativeType'
import { Identifier } from '../grammar'
import {Context} from "../runtime";
import {TypeFamily} from "../store";
import IType from "./IType";

export default class MissingType extends NativeType {

    static instance = new MissingType();
    constructor() {
        super(new Identifier("*"), TypeFamily.MISSING);
    }

    isAssignableFrom(context: Context, other: IType): boolean {
        return true;
    }
}
