import NativeType from './NativeType'
import { Identifier } from '../grammar'
import {TypeFamily} from "../store";

export default class JsxType extends NativeType {

    static instance = new JsxType();

    constructor() {
        super(new Identifier("Jsx"), TypeFamily.JSX);
    }
}

