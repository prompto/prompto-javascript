const ObjectList = require("../utils/ObjectList").ObjectList;
const Dialect = require("../parser/Dialect").Dialect;

class IdentifierList extends ObjectList {
    constructor(item) {
        super();
        item = item || null;
        if(item!==null) {
            this.add(item);
        }
        return this;
    }

    names() {
        return this.map(id => id.name );
    }

    hasAttribute(name) {
        for(let i = 0; i < this.length; i++) {
            if(this[i].name===name)
                return true;
        }
        return false;
    }

    toDialect(writer, finalAnd) {
        finalAnd = finalAnd || false;
        switch(writer.dialect) {
            case Dialect.E:
                this.toEDialect(writer, finalAnd);
                break;
            case Dialect.O:
                this.toODialect(writer);
                break;
            case Dialect.M:
                this.toMDialect(writer);
                break;
        }
    }

    toEDialect(writer, finalAnd) {
        switch(this.length) {
            case 0:
                return;
            case 1:
                writer.append(this[0].name);
                break;
            default:
                for(let i=0;i<this.length;i++) {
                    if(finalAnd && i==this.length-1)
                        break;
                    writer.append(this[i].name);
                    writer.append(", ");
                }
                writer.trimLast(2);
                if(finalAnd) {
                    writer.append(" and ");
                    writer.append(this[this.length-1].name);
                }
        }
    }

    toODialect(writer) {
        if(this.length>0) {
            this.forEach(id => {
                writer.append(id.name);
                writer.append(", ");
            });
            writer.trimLast(2);
        }
    }

    toMDialect(writer) {
        this.toODialect(writer);
    }
}

exports.IdentifierList = IdentifierList;