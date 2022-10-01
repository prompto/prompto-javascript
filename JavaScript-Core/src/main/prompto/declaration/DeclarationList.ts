import ObjectList from '../utils/ObjectList'
import { AttributeDeclaration, CategoryDeclaration, BaseMethodDeclaration, TestMethodDeclaration, EnumeratedNativeDeclaration } from '../declaration'
import IDeclaration from "./IDeclaration";
import {Context} from "../runtime";
import {CodeWriter} from "../utils";

export default class DeclarationList extends ObjectList<IDeclaration> {

    constructor(items?: IDeclaration[], item?: IDeclaration) {
        super(items, item);
    }

    register(context: Context): void {
        this.registerAttributes(context);
        this.registerCategories(context);
        this.registerEnumerated(context);
        this.registerMethods(context);
        this.registerTests(context);
    }

    registerAttributes(context: Context) {
        this.filter(decl => decl instanceof AttributeDeclaration).map(decl => decl as AttributeDeclaration).forEach(decl => decl.register(context));
    }

    registerCategories(context: Context) {
        this.filter(decl => decl instanceof CategoryDeclaration).map(decl => decl as CategoryDeclaration<any>).forEach(decl => decl.register(context));
    }

    registerEnumerated(context: Context) {
        this.filter(decl => decl instanceof EnumeratedNativeDeclaration).map(decl => decl as EnumeratedNativeDeclaration).forEach(decl => decl.register(context));
    }

    registerMethods(context: Context) {
        this.filter(decl => decl instanceof BaseMethodDeclaration).map(decl => decl as unknown as BaseMethodDeclaration).forEach(decl => decl.register(context));
    }

    registerTests(context: Context) {
        this.filter(decl => decl instanceof TestMethodDeclaration).map(decl => decl as TestMethodDeclaration).forEach(decl => decl.register(context));
    }

    unregister(context: Context): void {
        this.forEach(decl => decl.unregister(context));
    }

    check(context: Context): void {
        this.forEach(decl => {
            if(decl instanceof BaseMethodDeclaration)
                decl.check(context, true);
            else
                decl.check(context);
        });
    }

    toDialect(writer: CodeWriter): void {
        this.forEach(decl => {
            if(decl.comments)
                decl.comments.forEach(cmt => cmt.toDialect(writer));
            if(decl.annotations) {
                decl.annotations.forEach(ann => ann.toDialect(writer));
            }
            decl.toDialect(writer);
            writer.newLine();
        });
    }
}

