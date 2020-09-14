import BaseType from "./BaseType"
import { DocumentType } from "./index"
import { Identifier } from "../grammar/index"
import { Document, List } from "../intrinsic/index"

/* transient type for holding child property structure */
export default class PropertiesType extends BaseType {

    constructor(properties) {
        super(new Identifier("Properties"));
        this.properties = properties;
    }

    isAssignableFrom(context, other) {
        if(other instanceof DocumentType)
            return true;
        else
            return super.isAssignableFrom(context, other);
    }

    getMemberMethods(context, name) {
        const prop = this.properties.get(name);
        return prop ? prop.validator.getMethodDeclarations(context) :  super.getMemberMethods(context, name);
    }

    checkMember(context, section, name) {
        const prop = this.properties.get(name);
        return prop ? prop.validator.getType(context) :  super.checkMember(context, section, name);
    }

    declare(transpiler) {
        transpiler.register(Document);
        transpiler.register(List);
    }

    declareMember(transpiler, section, name) {
        const prop = this.properties.get(name);
        if(prop)
            prop.validator.getType(transpiler.context).declare(transpiler);
        else
            super.declareMember(transpiler, section, name);
    }

    transpileMember(transpiler, name) {
        if ("text"===name) {
            transpiler.append("getText()");
        } else {
            transpiler.append(name);
        }
    }
}

