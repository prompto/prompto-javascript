import NativeType from './NativeType'
import { Identifier } from '../grammar'
import {TypeFamily} from "../store";

export default class CodeType extends NativeType {

    static instance = new CodeType();

    constructor() {
        super(new Identifier("Code"), TypeFamily.CODE);
    }

}



