import ObjectList from '../utils/ObjectList'
import INativeCategoryBinding from "../../../main/prompto/grammar/INativeCategoryBinding";
import { IWritable, CodeWriter } from "../utils";

export default class NativeCategoryBindingList extends ObjectList<INativeCategoryBinding> implements IWritable {

    constructor(binding?: INativeCategoryBinding) {
        super(undefined, binding);
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("define category bindings as:").newLine().indent();
        this.forEach(binding => {
            binding.toEDialect(writer);
            writer.newLine();
        });
        writer.dedent();
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("def category bindings:").newLine().indent();
        this.forEach(binding => {
            binding.toMDialect(writer);
            writer.newLine();
        });
        writer.dedent();
    }

    toODialect(writer: CodeWriter): void {
        writer.append("category bindings {").newLine().indent();
        this.forEach(binding => {
            binding.toODialect(writer);
            writer.append(';').newLine();
        });
        writer.dedent().append("}");
    }
}
