
export default class NativeCategoryBindingList extends ObjectList {

    constructor(binding) {
        super();
        binding = binding || null;
        if (binding != null) {
            this.add(binding);
        }
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toEDialect(writer) {
        writer.append("define category bindings as:").newLine().indent();
        this.forEach(binding => {
            binding.toDialect(writer);
            writer.newLine();
        });
        writer.dedent();
    }

    toMDialect(writer) {
        writer.append("def category bindings:").newLine().indent();
        this.forEach(binding => {
            binding.toDialect(writer);
            writer.newLine();
        });
        writer.dedent();
    }

    toODialect(writer) {
        writer.append("category bindings {").newLine().indent();
        this.forEach(binding => {
            binding.toDialect(writer);
            writer.append(';').newLine();
        });
        writer.dedent().append("}");
    }
}