import ObjectList from '../utils/ObjectList';
import IDeclaration from "./IDeclaration";
import { Context } from "../runtime";
import { CodeWriter } from "../utils";
export default class DeclarationList extends ObjectList<IDeclaration> {
    constructor(items?: IDeclaration[], item?: IDeclaration);
    register(context: Context): void;
    registerAttributes(context: Context): void;
    registerCategories(context: Context): void;
    registerEnumerated(context: Context): void;
    registerMethods(context: Context): void;
    registerTests(context: Context): void;
    unregister(context: Context): void;
    check(context: Context): void;
    toDialect(writer: CodeWriter): void;
}
