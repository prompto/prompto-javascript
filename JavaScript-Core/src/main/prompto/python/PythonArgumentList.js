import ObjectList from "../utils/ObjectList"

export default class PythonArgumentList extends ObjectList {

    constructor(argument) {
        super();
        argument = argument || null;
        if(argument!==null) {
            this.add(argument);
        }
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
