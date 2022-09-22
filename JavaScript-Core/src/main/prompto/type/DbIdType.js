import NativeType from './NativeType.ts'
import { Identifier } from '../grammar'

export default class DbIdType extends NativeType {
 
    constructor() {
        super(new Identifier("DbId"));
     }

    isAssignableFrom(context, other) {
        return super.isAssignableFrom(context, other) || other instanceof NativeType;
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('DbId');
    }

}

DbIdType.instance = new DbIdType();


