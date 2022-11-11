import ObjectList from '../utils/ObjectList';
import INativeCategoryBinding from "./INativeCategoryBinding";
import { IWritable, CodeWriter } from "../utils";
export default class NativeCategoryBindingList extends ObjectList<INativeCategoryBinding> implements IWritable {
    constructor(bindings?: INativeCategoryBinding[], binding?: INativeCategoryBinding);
    toDialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
}
