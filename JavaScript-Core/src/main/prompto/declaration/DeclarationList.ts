import ObjectList from '../../../main/prompto/utils/ObjectList.js'
import { AttributeDeclaration, CategoryDeclaration, BaseMethodDeclaration, TestMethodDeclaration, EnumeratedNativeDeclaration } from '../declaration'
import IDeclaration from "./IDeclaration";
import {IDeclarationInfo} from "../runtime/Catalog";

export default class DeclarationList extends ObjectList<IDeclaration<IDeclarationInfo>> {

    constructor(items, item) {
        items = items || [];
        super(items);
        item = item || null;
        if(item!==null) {
            this.add(item);
        }
    }

    register(context: Context): void {
        this.registerAttributes(context);
        this.registerCategories(context);
        this.registerEnumerated(context);
        this.registerMethods(context);
        this.registerTests(context);
    }

    registerAttributes(context) {
        this.forEach(decl => {
            if(decl instanceof AttributeDeclaration)
                decl.register(context);
        });
    }

    registerCategories(context) {
        this.forEach(decl => {
            if(decl instanceof CategoryDeclaration)
                decl.register(context);
        });
    }

    registerEnumerated(context) {
        this.forEach(decl => {
            if(decl instanceof EnumeratedNativeDeclaration)
                decl.register(context);
        });
    }

    registerMethods(context) {
        this.forEach(decl => {
            if(decl instanceof BaseMethodDeclaration)
                decl.register(context);
        });
    }

    registerTests(context) {
        this.forEach(decl => {
            if(decl instanceof TestMethodDeclaration)
                decl.register(context);
        });
    }

    unregister(context: Context): void {
        this.forEach(decl => {
            decl.unregister(context);
        });
    }

    check(context: Context): Type {
        this.forEach(decl => {
            if(decl instanceof BaseMethodDeclaration)
                decl.check(context, true);
            else
                decl.check(context);
        });
    }

    toDialect(writer: CodeWriter): void {
        this.forEach(decl => {
            if(decl.comments) {
                decl.comments.forEach(cmt => {
                    cmt.toDialect(writer);
                });
            }
            if(decl.annotations) {
                decl.annotations.forEach(ann => {
                    ann.toDialect(writer);
                });
            }
            decl.toDialect(writer);
            writer.newLine();
        });
    }
}

