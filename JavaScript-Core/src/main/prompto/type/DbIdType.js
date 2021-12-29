import NativeType from './NativeType.js'
import { Identifier } from '../grammar/index.js'

export default class DbIdType extends NativeType {
 
    constructor() {
        super(new Identifier("DbId"));
     }

    isAssignableFrom(context, other) {
        return super.isAssignableFrom(context, other) || other instanceof NativeType;
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append('DbId');
    }

}

DbIdType.instance = new DbIdType();


