import NativeCategoryDeclaration from './NativeCategoryDeclaration'
import { ResourceType } from '../type'
import { NativeResource } from '../value'
import {Context, ResourceContext} from '../runtime'
import {Identifier, IdentifierList, NativeCategoryBindingList} from "../grammar";
import {MethodDeclaration} from "./index";
import {CodeWriter} from "../utils";

export default class NativeResourceDeclaration extends NativeCategoryDeclaration {

    constructor(id: Identifier, attributes: IdentifierList, categoryBindings: NativeCategoryBindingList, attributeBindings: any, methods: MethodDeclaration[]) {
        super(id, attributes, categoryBindings, attributeBindings, methods);
    }

    getType(context: Context): ResourceType {
        return new ResourceType(this.id);
    }

    newInstance(context: Context): NativeResource {
        return new NativeResource(context, this);
    }

    checkConstructorContext(context: Context): void {
        if(!(context instanceof ResourceContext))
            context.problemListener.reportNotAResourceContext(this);
    }

    categoryTypeToEDialect(writer: CodeWriter): void {
        writer.append("native resource");
    }

    categoryTypeToODialect(writer: CodeWriter): void {
        writer.append("native resource");
    }

    categoryTypeToMDialect(writer: CodeWriter): void {
        writer.append("native resource");
    }
}


