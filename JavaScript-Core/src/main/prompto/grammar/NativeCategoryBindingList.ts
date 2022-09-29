import ObjectList from '../utils/ObjectList'
import INativeCategoryBinding from "./INativeCategoryBinding";
import { IWritable, CodeWriter } from "../utils";

export default class NativeCategoryBindingList extends ObjectList<INativeCategoryBinding> implements IWritable {

    constructor(bindings?: INativeCategoryBinding[], binding?: INativeCategoryBinding) {
        super(bindings, binding);
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("define category bindings as:").newLine().indent();
        this.forEach(binding => {
            binding.toDialect(writer);
            writer.newLine();
        });
        writer.dedent();
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("def category bindings:").newLine().indent();
        this.forEach(binding => {
            binding.toDialect(writer);
            writer.newLine();
        });
        writer.dedent();
    }

    toODialect(writer: CodeWriter): void {
        writer.append("category bindings {").newLine().indent();
        this.forEach(binding => {
            binding.toDialect(writer);
            writer.append(';').newLine();
        });
        writer.dedent().append("}");
    }
}
