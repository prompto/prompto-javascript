const BaseType = require("./BaseType").BaseType;
const Identifier = require("../grammar/Identifier").Identifier;


class TypeType extends BaseType {
    constructor(type) {
        super(new Identifier("Type"));
        this.type = type;
        return this;
    }

    checkMember(context, section, name) {
        return this.type.checkStaticMember(context, section, name);
    }

    declareMember(transpiler, section, name) {
        this.type.declare(transpiler);
        this.type.declareStaticMember(transpiler, section, name);
    }

    transpileMember(transpiler, name) {
        this.type.transpileStaticMember(transpiler, name);
    }

    getMemberMethods(context, section, name) {
        return this.type.getStaticMemberMethods(context, section, name);
    }
}

exports.TypeType = TypeType;
