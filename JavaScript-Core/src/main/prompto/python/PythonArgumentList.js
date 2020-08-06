var ObjectList = require("../utils/ObjectList").ObjectList;

class PythonArgumentList extends ObjectList {
    constructor(argument) {
        super();
        argument = argument || null;
        if(argument!==null) {
            this.add(argument);
        }
        return this;
    }

    toDialect(writer) {
        if(this.length>0) {
            this.forEach(arg => {
                arg.toDialect(writer);
                writer.append(", ");
            });
            writer.trimLast(2);
        }
    }
}

exports.PythonArgumentList = PythonArgumentList;