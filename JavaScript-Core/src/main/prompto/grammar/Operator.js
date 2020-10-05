export default class Operator {

    constructor(name, token) {
        this.name = name;
        this.token = token;
    }

    toString() {
        return this.token;
    }

    toDialect(writer) {
        writer.append(this.token);
    }
}

Operator.PLUS = new Operator("PLUS", "+");
Operator.MINUS = new Operator("MINUS", "-");
Operator.MULTIPLY = new Operator("MULTIPLY", "*");
Operator.DIVIDE = new Operator("DIVIDE", "/");
Operator.IDIVIDE = new Operator("IDIVIDE", "\\");
Operator.MODULO = new Operator("MODULO", "%");
