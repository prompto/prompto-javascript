import CategoryDeclaration from './CategoryDeclaration'
import {
    SetterMethodDeclaration,
    GetterMethodDeclaration,
    EnumeratedNativeDeclaration,
    EnumeratedCategoryDeclaration,
    IMethodDeclaration, OperatorMethodDeclaration, AttributeDeclaration
} from '../declaration'
import {Context, MethodDeclarationMap, Transpiler} from '../runtime'
import $Root from '../intrinsic/$Root.js'
import {ConcreteInstance, Instance} from '../value'
import {CategoryType, IType} from '../type'
import { $DataStore } from '../store'
import {CodeWriter, equalArrays} from "../utils";
import {Identifier, IdentifierList, Operator} from "../grammar";
import {Section} from "../parser";
import BaseDeclaration from "./BaseDeclaration";

export default class ConcreteCategoryDeclaration extends CategoryDeclaration<ConcreteInstance> {

    methods: IMethodDeclaration[];
    methodsMap?: Map<string, MethodDeclarationMap>;

    constructor(id: Identifier, attributes: IdentifierList | null, derivedFrom: IdentifierList | null, methods: IMethodDeclaration[] | null) {
        super(id, attributes, derivedFrom);
        this.methods = methods || [];
    }

    isWidget(context: Context): boolean {
        if (this.derivedFrom && this.derivedFrom.length == 1) {
            const derived = context.getRegisteredCategoryDeclaration(this.derivedFrom[0]);
            return derived ? derived.isWidget(context) : false;
        } else
            return false;
    }

    toEDialect(writer: CodeWriter): void {
        const hasMethods = this.methods != null && this.methods.length > 0;
        this.protoToEDialect(writer, hasMethods, false); // no bindings
        if (hasMethods)
            this.methodsToEDialect(writer, this.methods);
    }

    categoryTypeToEDialect(writer: CodeWriter): void {
        if (this.derivedFrom == null)
            writer.append("category");
        else
            this.derivedFrom.toDialect(writer, true);
    }

    toODialect(writer: CodeWriter): void {
        const hasMethods = this.methods != null && this.methods.length > 0;
        this.allToODialect(writer, hasMethods);
    }

    categoryTypeToODialect(writer: CodeWriter): void {
        if (this.isWidget(writer.context))
            writer.append("widget");
        else
            writer.append("category");
    }

    categoryExtensionToODialect(writer: CodeWriter): void {
        if (this.derivedFrom != null) {
            writer.append(" extends ");
            this.derivedFrom.toDialect(writer, true);
        }
    }

    bodyToODialect(writer: CodeWriter): void {
        this.methodsToODialect(writer, this.methods);
    }

    toMDialect(writer: CodeWriter): void {
        this.protoToMDialect(writer, this.derivedFrom);
        this.methodsToMDialect(writer);
    }

    categoryTypeToMDialect(writer: CodeWriter): void {
        writer.append("class");
    }

    methodsToMDialect(writer: CodeWriter): void {
        writer.indent();
        if (this.methods == null || this.methods.length == 0)
            writer.append("pass").newLine();
        else {
            writer.newLine();
            this.methods.forEach(method => {
                if (method.comments) {
                    method.comments.forEach(cmt => cmt.toDialect(writer));
                }
                if (method.annotations) {
                    method.annotations.forEach(ann => ann.toDialect(writer));
                }
                const w = writer.newMemberWriter();
                method.toMDialect(w);
                writer.newLine();
            });
        }
        writer.dedent();
    }

    hasAttribute(context: Context, id: Identifier): boolean {
        if (super.hasAttribute(context, id)) {
            return true;
        } else {
            return this.hasDerivedAttribute(context, id);
        }
    }

    hasDerivedAttribute(context: Context, id: Identifier): boolean {
        if (this.derivedFrom == null) {
            return false;
        }
        for (let i = 0; i < this.derivedFrom.length; i++) {
            if (ConcreteCategoryDeclaration.ancestorHasAttribute(context, this.derivedFrom[i], id)) {
                return true;
            }
        }
        return false;
    }

    static ancestorHasAttribute(context: Context, ancestor: Identifier, id: Identifier): boolean {
        const actual = context.getRegisteredCategoryDeclaration(ancestor);
        return actual ? actual.hasAttribute(context, id) : false;
    }

    hasMethod(context: Context, id: Identifier): boolean {
        this.registerMethods(context);
        const key = ConcreteCategoryDeclaration.getMethodKey(id.name);
        return this.methodsMap!.has(key) || this.hasDerivedMethod(context, id);
    }

    hasDerivedMethod(context: Context, id: Identifier): boolean {
        if (this.derivedFrom == null) {
            return false;
        }
        for (let i = 0; i < this.derivedFrom.length; i++) {
            if (ConcreteCategoryDeclaration.ancestorHasMethod(context, this.derivedFrom[i], id)) {
                return true;
            }
        }
        return false;
    }

    static ancestorHasMethod(context: Context, ancestor: Identifier, id: Identifier): boolean {
        const actual = context.getRegisteredCategoryDeclaration(ancestor);
        return actual ? actual.hasMethod(context, id) : false;
    }

    check(context: Context): IType {
        context = context.newInstanceContext(null, this.getType(context), false);
        this.checkDerived(context);
        this.checkMethods(context);
        return super.check(context);
    }

    checkMethods(context: Context): void {
        this.registerMethods(context);
        this.methods.forEach(m => m.checkChild(context));
    }

    registerMethods(context: Context): void {
        if (!this.methodsMap) {
            this.methodsMap = new Map<string, MethodDeclarationMap>();
            this.methods.forEach(method => {
                method.memberOf = this;
                this.registerMethod(context, method);
            }, this);
        }
    }

    registerMethod(context: Context, method: IMethodDeclaration): void {
        let key: string;
        let proto: string;
        if (method instanceof SetterMethodDeclaration) {
            key = "setters";
            proto = method.name;
        } else if (method instanceof GetterMethodDeclaration) {
            key = "getters";
            proto = method.name;
        } else {
            key = ConcreteCategoryDeclaration.getMethodKey(method.name);
            proto = method.getProto(context);
        }
        let map: MethodDeclarationMap;
        if(this.methodsMap!.has(key))
            map = this.methodsMap!.get(key)!;
        else {
            map = new MethodDeclarationMap(method.id);
            this.methodsMap!.set(key, map);
        }
        if (map.hasProto(proto))
            context.problemListener.reportDuplicate(method as unknown as Section, method.id);
        else
            map.registerProto(method, context.problemListener, false);
    }

    static getMethodKey(name: string): string {
        return name == "constructor" ? "$constructor" : name;
    }

    getLocalMethods() {
        return this.methods;
    }

    getMemberMethods(context: Context, id: Identifier, includeAbstract: boolean): MethodDeclarationMap {
        this.registerMethods(context);
        const result = new MethodDeclarationMap(id);
        this.collectMemberMethods(context, result, includeAbstract);
        return result;
    }

    collectMemberMethods(context: Context, result: MethodDeclarationMap, includeAbstract: boolean): void {
        this.collectInheritedMemberMethods(context, result, includeAbstract);
        this.collectThisMemberMethods(context, result, includeAbstract);
    }

    collectInheritedMemberMethods(context: Context, result: MethodDeclarationMap, includeAbstract: boolean): void {
        if(this.derivedFrom == null)
            return;
        this.derivedFrom.forEach(id => this.collectInheritedMemberMethod(context, id, result, includeAbstract), this);
    }

    collectInheritedMemberMethod(context: Context, ancestor: Identifier, result: MethodDeclarationMap, includeAbstract: boolean): void {
        const decl = context.getRegisteredCategoryDeclaration(ancestor);
        if(decl == null || !(decl instanceof ConcreteCategoryDeclaration))
            return;
        decl.registerMethods(context);
        decl.collectMemberMethods(context, result, includeAbstract);
    }

    collectThisMemberMethods(context: Context, result: MethodDeclarationMap, includeAbstract: boolean): void {
        if(!this.methodsMap || !this.methodsMap.has(result.id.name))
            return;
        this.methodsMap.get(result.id.name)!.getAll().forEach(method => {
            if(includeAbstract || !method.isAbstract())
                result.registerProto(method, context.problemListener, true);
        }, this);
    }

    checkDerived(context: Context): void {
        if(this.derivedFrom!=null) {
            this.derivedFrom.map( id => {
                const cd = context.getRegisteredCategoryDeclaration(id) || null;
                if (!cd)
                    context.problemListener.reportUnknownCategory(id, id.name);
            });
        }
    }

    isDerivedFrom(context: Context, categoryType: IType): boolean {
        if(this.derivedFrom==null) {
            return false;
        }
        for(let i=0;i<this.derivedFrom.length;i++) {
            const ancestor = this.derivedFrom[i];
            if(ancestor.name == categoryType.name) {
                return true;
            }
            if(ConcreteCategoryDeclaration.isAncestorDerivedFrom(context, ancestor, categoryType)) {
                return true;
            }
        }
        return false;
    }

    static isAncestorDerivedFrom(context: Context, ancestor: Identifier, categoryType: IType): boolean {
        const actual = context.getRegisteredCategoryDeclaration(ancestor);
        return actual ? actual.isDerivedFrom(context, categoryType) : false;
    }

    newInstance(context: Context): Instance<any> {
        return new ConcreteInstance(context, this);
    }

    findGetter(context: Context, name: Identifier): GetterMethodDeclaration | null {
        if(!this.methodsMap || !this.methodsMap.has("getters")) {
            return null;
        }
        const map = this.methodsMap.get("getters");
        return map!.protos.get(name.name) as GetterMethodDeclaration || this.findDerivedGetter(context, name);
    }

    findDerivedGetter(context: Context, name: Identifier): GetterMethodDeclaration | null {
        if(!this.derivedFrom) {
            return null;
        }
        for(let i=0; i<this.derivedFrom.length; i++) {
            const found = ConcreteCategoryDeclaration.findAncestorGetter(context, this.derivedFrom[i], name);
            if (found)
                return found;
        }
        return null;
    }

    static findAncestorGetter(context: Context, ancestor: Identifier, name: Identifier): GetterMethodDeclaration | null {
        const actual = context.getRegisteredDeclaration<ConcreteCategoryDeclaration>(ConcreteCategoryDeclaration, ancestor);
        return actual ? actual.findGetter(context, name) : null;
    }

    findSetter(context: Context, name: Identifier): SetterMethodDeclaration | null {
        if(!this.methodsMap || !this.methodsMap.has("setters")) {
            return null;
        }
        const map = this.methodsMap.get("setters");
        return map!.protos.get(name.name) as SetterMethodDeclaration || this.findDerivedSetter(context, name);
    }

    findDerivedSetter(context: Context, name: Identifier): SetterMethodDeclaration | null {
        if(!this.derivedFrom) {
            return null;
        }
        for(let i=0; i<this.derivedFrom.length; i++) {
            const found = ConcreteCategoryDeclaration.findAncestorSetter(context, this.derivedFrom[i], name);
            if (found)
                return found;
        }
        return null;
    }

    static findAncestorSetter(context: Context, ancestor: Identifier, name: Identifier): SetterMethodDeclaration | null {
        const actual = context.getRegisteredDeclaration<ConcreteCategoryDeclaration>(ConcreteCategoryDeclaration, ancestor);
        return actual ? actual.findSetter(context, name) : null;
    }

    getMemberMethodsMap(context: Context, id: Identifier): MethodDeclarationMap {
        const methodsMap = new MethodDeclarationMap(id);
        this.registerMemberMethods(context, methodsMap);
        return methodsMap;
    }

    registerMemberMethods(context: Context, result: MethodDeclarationMap): void {
        this.registerMethods(context);
        this.registerThisMemberMethods(context,result);
        this.registerDerivedMemberMethods(context,result);
    }

    registerThisMemberMethods(context: Context, result: MethodDeclarationMap): void {
        if(!this.methodsMap) {
            return;
        }
        const key = ConcreteCategoryDeclaration.getMethodKey(result.id.name);
        const actual = this.methodsMap.get(key) || null;
        if(!actual) {
            return;
        }
        for(const [/*proto*/, method] of actual.protos) {
            result.registerIfMissing(method);
        }
    }

    registerDerivedMemberMethods(context: Context, result: MethodDeclarationMap): void {
        if(this.derivedFrom)
            this.derivedFrom.forEach(ancestor => ConcreteCategoryDeclaration.registerAncestorMemberMethods(context, ancestor, result), this);
    }

    static registerAncestorMemberMethods(context: Context, ancestor: Identifier, result: MethodDeclarationMap): void {
        const actual = context.getRegisteredDeclaration<ConcreteCategoryDeclaration>(ConcreteCategoryDeclaration, ancestor);
        if(actual)
            actual.registerMemberMethods(context, result);
    }

    getOperatorMethod(context: Context, operator: Operator, type: IType): OperatorMethodDeclaration | null {
        const methodName = "operator_" + operator.name;
        const methods = this.getMemberMethodsMap(context, new Identifier(methodName));
        if(methods==null)
            return null;
        // find best candidate
        let candidate: OperatorMethodDeclaration;
        methods.getAll().forEach(method => {
            if(method instanceof OperatorMethodDeclaration) {
                const paramType = method.parameters[0].getType(context);
                if (paramType.isAssignableFrom(context, type)) {
                    if (candidate) {
                        const currentBest = candidate.parameters[0].getType(context);
                        if (paramType.isAssignableFrom(context, currentBest))
                            candidate = method;
                    } else
                        candidate = method;
                }
            }
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return candidate || null;
    }


    declare(transpiler: Transpiler): void {
        transpiler.require(equalArrays);
        transpiler.declare(this);
        transpiler = transpiler.newInstanceTranspiler(this.getType(transpiler.context));
        if (this.derivedFrom != null) {
            this.derivedFrom.forEach(cat => {
                const decl = transpiler.context.getRegisteredCategoryDeclaration(cat);
                if(decl)
                    decl.declare(transpiler);
            });
        } else
            this.declareRoot(transpiler);
        if(this.storable)
            transpiler.require($DataStore);
        this.declareMethods(transpiler);
    }

    declareMethods(transpiler: Transpiler): void {
        this.methods.filter(decl => !(decl instanceof SetterMethodDeclaration || decl instanceof GetterMethodDeclaration)).forEach(method => {
            const t = transpiler.newChildTranspiler();
            method.declare(t);
            t.flush();
        }, this);
    }

    declareRoot(transpiler: Transpiler): void {
        // eslint-disable-next-line @typescript-eslint/ban-types
        transpiler.require($Root as unknown as Function);
    }

    transpile(transpiler: Transpiler): void {
        this.transpileConstructor(transpiler);
        transpiler = transpiler.newInstanceTranspiler(new CategoryType(this.id));
        this.transpileLoaders(transpiler);
        this.transpileMethods(transpiler);
        this.transpileGetterSetters(transpiler);
        transpiler.flush();
    }

    transpileConstructor(transpiler: Transpiler): void {
        transpiler.append("function ").append(this.name).append("(copyFrom, values, mutable) {");
        transpiler.indent();
        const categories = this.getAllCategories(transpiler.context);
        if(this.storable) {
            transpiler.append("if(!this.$storable) {").indent()
                .append("var dbIdFactory = { provider: this.getDbId.bind(this), listener: this.setDbId.bind(this) };").newLine()
                .append("this.$storable = $DataStore.instance.newStorableDocument(['").append(categories.join("', '")).append("'], dbIdFactory);").newLine()
                .dedent().append("}").newLine();
        }
        this.transpileGetterSetterAttributes(transpiler);
        this.transpileSuperConstructor(transpiler);
        transpiler.append("this.$categories = [").append(categories.join(', ')).append("];").newLine();
        this.transpileLocalAttributes(transpiler);
        transpiler.append("this.$mutable = mutable;").newLine();
        transpiler.append("return this;");
        transpiler.dedent();
        transpiler.append("}");
        transpiler.newLine();
        const parents = this.derivedFrom && this.derivedFrom.length ? this.derivedFrom : [new Identifier("$Root")];
        transpiler.append(this.name).append(".prototype = Object.create(").append(parents[0].name).append(".prototype);").newLine();
        const reversed = parents.reverse(); // fulfill MRO
        transpiler.append(this.name).append(".prototype = Object.assign(").append(this.name).append(".prototype");
        reversed.forEach(p => transpiler.append(", ").append(p.toString()).append(".prototype"));
        transpiler.append(");").newLine();
        transpiler.append(this.name).append(".prototype.constructor = ").append(this.name).append(";").newLine();
    }

    transpileLoaders(transpiler: Transpiler): void {
        if (this.attributes)
            this.attributes
                .filter(id => this.isEnumeratedAttribute(transpiler.context, id), this)
                .forEach(id => {
                        transpiler.append(this.name).append(".prototype.load$").append(id.name).append(" = function(name) {").indent();
                        transpiler.append("return eval(name);").dedent();
                        transpiler.append("};").newLine();
                    }, this);
    }

    isEnumeratedAttribute(context: Context, id: Identifier): boolean {
        const attr = context.getRegisteredDeclaration<AttributeDeclaration>(AttributeDeclaration, id);
        if(attr) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const decl = context.getRegisteredDeclaration<BaseDeclaration>(BaseDeclaration, attr.type.id);
            return decl instanceof EnumeratedCategoryDeclaration || decl instanceof EnumeratedNativeDeclaration;
        } else
            return false;
    }

    transpileLocalAttributes(transpiler: Transpiler): void {
        if (this.attributes) {
            transpiler.append("this.$mutable = true;").newLine();
            transpiler.append("values = Object.assign({}, copyFrom, values);").newLine();
            this.attributes.forEach(id => {
                const isEnum =  this.isEnumeratedAttribute(transpiler.context, id);
                const decl = transpiler.context.getRegisteredDeclaration<AttributeDeclaration>(AttributeDeclaration, id);
                if(decl)
                    transpiler.append("this.setMember('")
                            .append(id.name)
                            .append("', values.hasOwnProperty('")
                            .append(id.name)
                            .append("') ? values.")
                            .append(id.name)
                            .append(" : null")
                            .append(", ")
                            .appendBoolean(decl.storable)
                            .append(", mutable")
                            .append(", ")
                            .appendBoolean(isEnum)
                            .append(");").newLine();
            }, this);
        }
    }

    transpileSuperConstructor(transpiler: Transpiler): Transpiler {
        if (this.derivedFrom) {
            this.derivedFrom.forEach(derived => {
                transpiler = transpiler.append(derived.name).append(".call(this, copyFrom, values, mutable);").newLine();
            });
            return transpiler;
        } else
            return this.transpileRootConstructor(transpiler).newLine();
    }

    transpileRootConstructor(transpiler: Transpiler): Transpiler {
        return transpiler.append("$Root.call(this);").newLine();
    }

    transpileGetterSetterAttributes(transpiler: Transpiler): Transpiler {
        const allAttributes = this.getAllAttributes(transpiler.context, this);
        if(allAttributes) {
            allAttributes.forEach(id => {
                const method = this.findGetter(transpiler.context, id) || this.findSetter(transpiler.context, id);
                if (method)
                    transpiler.append("this.$").append(id.name).append(" = null;").newLine();
            }, this);
        }
        return transpiler;
    }

    transpileMethods(transpiler: Transpiler): Transpiler {
        this.methods.filter(decl => !(decl instanceof SetterMethodDeclaration || decl instanceof GetterMethodDeclaration)).forEach(method => {
            const t = transpiler.newChildTranspiler();
            method.transpile(t);
            t.flush();
        }, this);
        return transpiler;
    }

    transpileGetterSetters(transpiler: Transpiler): Transpiler {
        const getterSetters = this.methods.filter(decl => decl instanceof SetterMethodDeclaration || decl instanceof GetterMethodDeclaration, this);
        const names = new Set(getterSetters.map(decl => decl.id));
        names.forEach(id => this.transpileGetterSetter(transpiler, id), this);
        return transpiler;
    }

    transpileGetterSetter(transpiler: Transpiler, id: Identifier): Transpiler {
        const name = id.name;
        const getter = this.findGetter(transpiler.context, id);
        const setter = this.findSetter(transpiler.context, id);
        transpiler.append("Object.defineProperty(").append(this.name).append(".prototype, '").append(name).append("', {").indent();
        transpiler.append("get: function() {").indent();
        if(getter) {
            const t = transpiler.newGetterTranspiler(name);
            getter.transpile(t);
            t.flush();
        } else
            transpiler.append("return this.$").append(name).append(";").newLine();
        transpiler.dedent().append("}");
        transpiler.append(",").newLine();
        transpiler.append("set: function(").append(name).append(") {").indent();
        if(setter) {
            const t = transpiler.newSetterTranspiler(name);
            t.append(name).append(" = (function(").append(name).append(") {").indent();
            setter.transpile(t);
            t.append(";").dedent().append("})(name);").newLine();
            t.flush();
        }
        transpiler.append("this.$").append(name).append(" = ").append(name).append(";").newLine();
        transpiler.dedent().append("}");
        transpiler.dedent().append("});").newLine();
        return transpiler;
    }

    locateSectionAtLine(line: number): Section | null {
        for(let i=0;i<this.methods.length;i++) {
            const section = this.methods[i].locateSectionAtLine(line);
            if(section != null)
                return section;
        }
        return null;
    }
}
