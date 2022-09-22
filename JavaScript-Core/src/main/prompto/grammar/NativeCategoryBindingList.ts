import ObjectList from '../utils/ObjectList'
import NativeCategoryBinding from "./NativeCategoryBinding";
import { Writable, CodeWriter } from "../utils";

export default class NativeCategoryBindingList extends ObjectList<NativeCategoryBinding> implements Writable {

    constructor(binding?: NativeCategoryBinding) {
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
