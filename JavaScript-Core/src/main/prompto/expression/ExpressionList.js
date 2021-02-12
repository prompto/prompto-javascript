import ObjectList from '../utils/ObjectList.js'

export default class ExpressionList extends ObjectList {

    constructor(items, item) {
        super(items, item);
    }

    locateSectionAtLine(line) {
        for(let i = 0;i < this.length; i++) {
            const section = this[i].locateSectionAtLine(line);
            if(section !== null)
                return section;
        }
        return null;
    }

    toDialect(writer) {
        if (this.length > 0) {
            for (let i = 0; i < this.length; i++) {
                this[i].toDialect(writer);
                writer.append(", ");
            }
            writer.trimLast(2);
        }
    }

    declare(transpiler) {
        this.forEach(item => {
            item.declare(transpiler);
        });
    }

    transpile(transpiler) {
        if (this.length > 0) {
            for (let i = 0; i < this.length; i++) {
                this[i].transpile(transpiler);
                transpiler.append(", ");
            }
            transpiler.trimLast(2);
        }
    }
}