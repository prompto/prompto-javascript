import BaseType from './BaseType.js'
import { DocumentType } from './index.js'
import { Identifier } from '../grammar/index.js'
import { Document, List } from '../intrinsic/index.js'

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

    getMemberMethods(context, id) {
        const prop = this.properties.get(id.name);
        return prop ? prop.validator.getMethodDeclarations(context) :  super.getMemberMethods(context, id);
    }

    checkMember(context, section, id) {
        const prop = this.properties.get(id.name);
        return prop ? prop.validator.getType(context) :  super.checkMember(context, section, id);
    }

    declare(transpiler) {
        transpiler.register(Document);
        transpiler.register(List);
    }

    declareMember(transpiler, section, id) {
        const prop = this.properties.get(id.name);
        if(prop)
            prop.validator.getType(transpiler.context).declare(transpiler);
        else
            super.declareMember(transpiler, section, id);
    }

    transpileMember(transpiler, id) {
        if ("text" === id.name) {
            transpiler.append("getText()");
        } else {
            transpiler.append(id.name);
        }
    }
}

