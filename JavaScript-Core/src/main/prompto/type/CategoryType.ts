import BaseType from './BaseType'
import { AnyType, NativeType, TextType, MethodType, VoidType, NullType, MissingType,
    EnumeratedCategoryType, EnumeratedNativeType } from '../type'
import {
    CategoryDeclaration, ConcreteCategoryDeclaration, SingletonCategoryDeclaration,
    EnumeratedNativeDeclaration, EnumeratedCategoryDeclaration, IDeclaration, IMethodDeclaration, AttributeDeclaration
} from '../declaration'
import {InternalError, PromptoError} from '../error'
import {
    UnresolvedIdentifier,
    ValueExpression,
    MethodSelector,
    ArrowExpression,
    InstanceExpression,
    IExpression
} from '../expression'
import { Operator, Identifier, Argument, ArgumentList } from '../grammar'
import {Context, MethodDeclarationMap, MethodFinder, Score, Transpiler} from '../runtime'
import { MethodCall } from '../statement'
import {$DataStore, IStored, TypeFamily} from '../store'
import {CodeWriter, compareValues, convertToJsonNode, convertToJsonString} from '../utils'
import { SyntaxError } from '../error'
import { Section } from '../parser'
import { Any } from '../intrinsic'
import { Category } from '../intrinsic/$Root.js'
import {ConcreteInstance, Instance, IValue} from "../value";
import IType from "./IType";


export default class CategoryType extends BaseType {

    _mutable: boolean;

    constructor(id: Identifier, mutable?: boolean) {
        super(id, TypeFamily.CATEGORY);
        this._mutable = mutable || false;
    }

    get mutable(): boolean {
        return this.mutable;
    }

    asMutable(context: Context, mutable: boolean): CategoryType {
        if(mutable == this.mutable)
            return this;
        else
            return new CategoryType(this.id, mutable);
    }

    isStorable(context: Context): boolean {
        const decl = this.getDeclaration(context);
        if (decl instanceof CategoryDeclaration)
            return decl.isStorable(context);
        else
            return false;
    }

    anyfy(): IType {
        if (this.name == "Any")
            return AnyType.instance;
        else
            return this;
    }

    resolve(context: Context, onError?: (type: IType) => void): IType {
        let type = this.anyfy();
        if(type instanceof NativeType)
            return type;
        const decl = context.getRegistered(type.id);
        if(!decl) {
            if(onError)
                onError(type);
            else
                context.problemListener.reportUnknownCategory(this.id, this.name);
            return AnyType.instance; // don't propagate error
        } else if(decl instanceof MethodDeclarationMap) {
            const method = new MethodType(decl.getFirst()!);
            method.copySectionFrom(this);
            return method;
        } else {
            type = decl.getType(context);
            return type.equals(this) ? this : type;
        }
    }

    toDialect(writer: CodeWriter, skipMutable?: boolean) {
        if (this.mutable && !skipMutable)
            writer.append("mutable ");
        writer.append(this.name);
    }

    getSuperType(context: Context, section: Section): CategoryType {
        const decl = this.getDeclaration(context);
        if(decl instanceof CategoryDeclaration) {
            const derived = decl.derivedFrom;
            if(derived && derived.length)
                return new CategoryType(derived[0]);
        }
        context.problemListener.reportNoSuperType(section, this);
        return VoidType.instance;
    }

    declare(transpiler: Transpiler): void {
        const actual = this.resolve(transpiler.context);
        if(actual === this) {
            if (this.name === "Any") {
                transpiler.require(Any);
            } else {
                const decl = this.getDeclaration(transpiler.context);
                decl.declare(transpiler);
            }
        } else if(actual)
            actual.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.name);
    }

    transpileInstance(transpiler: Transpiler): void {
        const decl = this.getDeclaration(transpiler.context);
        if(decl instanceof SingletonCategoryDeclaration)
            transpiler.append(this.name).append(".instance");
        else
            transpiler.append("this");
    }

    newInstanceFromStored(context: Context, stored: IStored): Instance<unknown> {
        const decl = this.getDeclaration(context);
        if (decl instanceof CategoryDeclaration) {
            const inst = decl.newInstanceFromStored(context, stored);
            inst.mutable = this.mutable;
            return inst;
        } else
            throw new SyntaxError("Should never get there!");
    }

    checkUnique(context: Context): void {
        const actual = context.getRegistered(this.id) || null;
        if(actual) {
            throw new SyntaxError("Duplicate name: \"" + this.name + "\"");
        }
    }

    getDeclaration(context: Context): IDeclaration {
        const decl = context.getRegistered(this.id) || null;
        if(!decl) {
            if(context.problemListener)
                context.problemListener.reportUnknownCategory(this.id, this.name);
            else
                throw new SyntaxError("Unknown category: \"" + this.name + "\"");
        }
        return decl as IDeclaration;
    }

    checkMultiply(context: Context, section: Section, other: IType, tryReverse: boolean): IType {
        const type = this.checkOperator(context, other, tryReverse, Operator.MULTIPLY);
        if(type!=null)
            return type;
        else
            return super.checkMultiply(context, section, other, tryReverse);
    }

    declareMultiply(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        const type = this.checkOperator(transpiler.context, other, tryReverse, Operator.MULTIPLY);
        if(type!=null) {
            left.declare(transpiler);
            right.declare(transpiler);
            type.declare(transpiler);
        } else
            return super.declareMultiply(transpiler, other, tryReverse, left, right);
    }

    transpileMultiply(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void  {
        const type = this.checkOperator(transpiler.context, other, tryReverse, Operator.MULTIPLY);
        if(type!=null) {
            left.transpile(transpiler);
            transpiler.append(".operator_MULTIPLY").append("$").append(other.getTranspiledName(transpiler.context)).append("(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileMultiply(transpiler, other, tryReverse, left, right);

    }

    checkDivide(context: Context, other: IType): IType {
        const type = this.checkOperator(context, other, false, Operator.DIVIDE);
        if(type!=null)
            return type;
        else
            return super.checkDivide(context, other);
    }

    declareDivide(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        const type = this.checkOperator(transpiler.context, other, false, Operator.DIVIDE);
        if(type!=null) {
            left.declare(transpiler);
            right.declare(transpiler);
            type.declare(transpiler);
        } else
            return super.declareDivide(transpiler, other, left, right);
    }

    transpileDivide(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        left.transpile(transpiler);
        transpiler.append(".operator_DIVIDE").append("$").append(other.getTranspiledName(transpiler.context)).append("(");
        right.transpile(transpiler);
        transpiler.append(")");
    }

    checkIntDivide(context: Context, other: IType): IType {
        const type = this.checkOperator(context, other, false, Operator.IDIVIDE);
        if(type!=null)
            return type;
        else
            return super.checkIntDivide(context, other);
    }

    declareIntDivide(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        const type = this.checkOperator(transpiler.context, other, false, Operator.IDIVIDE);
        if(type!=null) {
            left.declare(transpiler);
            right.declare(transpiler);
            type.declare(transpiler);
        } else
            return super.declareDivide(transpiler, other, left, right);
    }

    transpileIntDivide(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        left.transpile(transpiler);
        transpiler.append(".operator_IDIVIDE").append("$").append(other.getTranspiledName(transpiler.context)).append("(");
        right.transpile(transpiler);
        transpiler.append(")");
    }

    checkModulo(context: Context, section: Section, other: IType): IType {
        const type = this.checkOperator(context, other, false, Operator.MODULO);
        if(type!=null)
            return type;
        else
            return super.checkModulo(context, section, other);
    }

    declareModulo(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        const type = this.checkOperator(transpiler.context, other, false, Operator.MODULO);
        if(type!=null) {
            left.declare(transpiler);
            right.declare(transpiler);
            type.declare(transpiler);
        } else
            return super.declareModulo(transpiler, other, left, right);
    }

    transpileModulo(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        left.transpile(transpiler);
        transpiler.append(".operator_MODULO").append("$").append(other.getTranspiledName(transpiler.context)).append("(");
        right.transpile(transpiler);
        transpiler.append(")");
    }

    checkAdd(context: Context, section: Section, other: IType, tryReverse: boolean): IType {
        const type = this.checkOperator(context, other, tryReverse, Operator.PLUS);
        if(type!=null)
            return type;
        else
            return super.checkAdd(context, section, other, tryReverse);
    }

    declareAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        const type = this.checkOperator(transpiler.context, other, tryReverse, Operator.PLUS);
        if(type!=null) {
            left.declare(transpiler);
            right.declare(transpiler);
            type.declare(transpiler);
        } else
            return super.declareAdd(transpiler, other, tryReverse, left, right);
    }

    transpileAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        left.transpile(transpiler);
        transpiler.append(".operator_PLUS").append("$").append(other.getTranspiledName(transpiler.context)).append("(");
        right.transpile(transpiler);
        transpiler.append(")");
    }

    checkSubtract(context: Context, other: IType): IType {
        const type = this.checkOperator(context, other, false, Operator.MINUS);
        if(type!=null)
            return type;
        else
            return super.checkSubtract(context, other);
    }

    declareSubtract(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        const type = this.checkOperator(transpiler.context, other, false, Operator.MINUS);
        if(type!=null) {
            left.declare(transpiler);
            right.declare(transpiler);
            type.declare(transpiler);
        } else
            return super.declareDivide(transpiler, other, left, right);
    }

    transpileSubtract(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void {
        left.transpile(transpiler);
        transpiler.append(".operator_MINUS").append("$").append(other.getTranspiledName(transpiler.context)).append("(");
        right.transpile(transpiler);
        transpiler.append(")");
    }

    checkOperator(context: Context, other: IType, tryReverse: boolean, operator: Operator): IType | null {
        const actual = this.getDeclaration(context);
        if(actual instanceof ConcreteCategoryDeclaration) try {
            const method = actual.getOperatorMethod(context, operator, other);
            if(method==null)
                return null;
            context = context.newInstanceContext(null, this);
            const local = context.newLocalContext();
            method.registerParameters(local);
            return method.check(local, false);
        } catch(e) {
            // ok to pass, will try reverse
        }
        if(tryReverse)
            return null;
        else
            throw new SyntaxError("Unsupported operation: " + this.name + " " + operator.token + " " + other.name);
    }

    checkExists(context: Context): void {
        this.resolve(context);
    }

    checkMember(context: Context, section: Section, id: Identifier): IType {
        if ("category" === id.name)
            return new CategoryType(new Identifier("Category"));
        else if ("json" === id.name)
            return TextType.instance;
        else
            return this.checkAttribute(context, section, id);
    }

    checkAttribute(context: Context, section: Section, id: Identifier): IType {
        const decl = context.getRegistered(this.id);
        if (!decl) {
            context.problemListener.reportUnknownCategory(this.id, this.name);
            return VoidType.instance;
        }
        if (decl instanceof EnumeratedNativeDeclaration) {
            return decl.getType(context).checkMember(context, section, id);
        } else if (decl instanceof CategoryDeclaration) {
            return this.checkCategoryAttribute(context, section, decl, id);
        } else {
            context.problemListener.reportUnknownCategory(this.id, this.name);
            return VoidType.instance;
        }
    }

    checkCategoryAttribute(context: Context, section: Section, decl: SingletonCategoryDeclaration, id: Identifier): IType {
        if(decl.storable && "dbId" === id.name)
            return AnyType.instance;
        else if (decl.hasAttribute(context, id)) {
            const ad = context.getRegisteredDeclaration<AttributeDeclaration>(AttributeDeclaration, id);
            if (ad == null) {
                context.problemListener.reportUnknownAttribute(section, id.name);
                return VoidType.instance;
            }
            return ad.getType();
        } else if ("text" === id.name) {
            return TextType.instance
        } else if (decl.hasMethod(context, id)) {
            const method = decl.getMemberMethodsMap(context, id).getFirst();
            return new MethodType(method!); // the map can't be empty
        } else {
            context.problemListener.reportUnknownAttribute(section, id.name);
            return VoidType.instance;
        }
    }

    declareMember(transpiler: Transpiler, id: Identifier): void {
        switch(id.name) {
            case "category":
                transpiler.require(Category);
                break;
            case "json":
                transpiler.require(convertToJsonString);
                transpiler.require(convertToJsonNode);
                break;
        }
        // TODO visit attributes
    }

    transpileMember(transpiler: Transpiler, id: Identifier): void {
        switch(id.name) {
            case "text":
                transpiler.append("getText()");
                break;
            case "json":
                transpiler.append("toJson()");
                break;
            default:
                transpiler.append(id.name);
        }
    }

    checkStaticMember(context: Context, section: Section, id: Identifier): IType {
        const decl = context.getRegistered(this.id);
        if(!decl) {
            context.problemListener.reportUnknownIdentifier(section, this.name);
            return VoidType.instance;
        } else if(decl instanceof EnumeratedCategoryDeclaration || decl instanceof EnumeratedNativeDeclaration) {
            return decl.getType(context).checkStaticMember(context, section, id);
        } else if(decl instanceof SingletonCategoryDeclaration) {
            return this.checkCategoryAttribute(context, section, decl, id);
        } else {
            context.problemListener.reportUnknownAttribute(id, id.name);
            return VoidType.instance;
        }
    }

    declareStaticMember(transpiler: Transpiler, id: Identifier): void {
        // TODO visit attributes
    }

    transpileStaticMember(transpiler: Transpiler, id: Identifier): void {
        if(this.getDeclaration(transpiler.context) instanceof SingletonCategoryDeclaration)
            transpiler.append("instance.");
        transpiler.append(id.name);
    }

    getStaticMemberValue(context: Context, id: Identifier): IValue {
        const decl = this.getDeclaration(context);
        if(decl instanceof EnumeratedCategoryDeclaration || decl instanceof EnumeratedNativeDeclaration)
            return decl.getType(context).getStaticMemberValue(context, id);
        else if(decl instanceof SingletonCategoryDeclaration) {
            const singleton = context.loadSingleton(this);
            return singleton.getMemberValue(context, id);
        } else
            return super.getStaticMemberValue(context, id);
    }

    isAssignableFrom(context: Context, other: IType): boolean {
        return super.isAssignableFrom(context, other)
            || ((other instanceof CategoryType) && this.isAssignableFromCategory(context, other));
    }

    isAssignableFromCategory(context: Context, other: CategoryType): boolean {
        return "Any" == this.name
                || other.isDerivedFrom(context, this)
                || other.isDerivedFromAnonymous(context, this);
    }

    isDerivedFrom(context: Context, other: CategoryType): boolean {
        try {
            const thisDecl = this.getDeclaration(context);
            if (thisDecl instanceof CategoryDeclaration)
                return this.isDerivedFromCategory(context, thisDecl, other);
        } catch (e) {
            /* eslint no-empty: [ "off" ] */
        }
        return false; // TODO
    }

    isDerivedFromCategory(context: Context, decl: CategoryDeclaration, other: CategoryType): boolean {
        if(decl.derivedFrom==null) {
            return false;
        }
        for(let i=0;i<decl.derivedFrom.length; i++) {
            const ct = new CategoryType(decl.derivedFrom[i]);
            if (ct.equals(other) || ct.isDerivedFrom(context, other)) {
                return true;
            }
        }
        return false;
    }

    isDerivedFromAnonymous(context: Context, other: IType): boolean {
        if (!(other instanceof CategoryType) || !other.isAnonymous())
            return false;
        try {
            const thisDecl = this.getDeclaration(context);
            if (thisDecl instanceof CategoryDeclaration) {
                const otherDecl = other.getDeclaration(context);
                if (otherDecl instanceof CategoryDeclaration)
                    return this.isDerivedFromAnonymousCategory(context, thisDecl, otherDecl);
            }
            return false;
        } catch (e) {
            if (e instanceof SyntaxError) {
                return false;
            } else {
                throw e;
            }
        }
    }

    isDerivedFromAnonymousCategory(context: Context, section: Section, thisDecl: CategoryDeclaration, otherDecl: CategoryDeclaration): boolean {
        // an anonymous category extends 1 and only 1 category
        const baseId = otherDecl.derivedFrom![0];
        // check we derive from root category (if not extending 'Any')
        if("any" !== baseId.name && !thisDecl.isDerivedFrom(context, new CategoryType(baseId)))
            return false;
        const allAttributeIds = otherDecl.getAllAttributes(context, section);
        if (!allAttributeIds)
            return false;
        for(const id of allAttributeIds?.values()) {
            if(!thisDecl.hasAttribute(context, id)) {
                return false;
            }
        }
        return true;
    }

    isAnonymous(): boolean {
        return this.name[0] === this.name[0].toLowerCase(); // since it's the name of the argument
    }

    isMoreSpecificThan(context: Context, other: IType): boolean {
        if(other instanceof NullType || other instanceof AnyType || other instanceof MissingType)
            return true;
        if(!(other instanceof CategoryType)) {
            return false;
        }
        if(other.isAnonymous()) {
            return true;
        }
        const thisDecl = context.getRegisteredCategoryDeclaration(this.id);
        if(thisDecl && thisDecl.isDerivedFrom(context, other)) {
            return true;
        } else {
            return false;
        }
    }

    compareSpecifity(context: Context, t1: IType, t2: IType): Score {
        if(t1.equals(t2)) {
            return Score.SIMILAR;
        } else if(this.equals(t1)) {
            return Score.BETTER;
        } else  if(this.equals(t2)) {
            return Score.WORSE;
        }
        // since this derives from both t1 and t2, return the most specific of t1 and t2
        if(t1.isMoreSpecificThan(context,t2)) {
            return Score.BETTER;
        } else if(t2.isMoreSpecificThan(context,t1)) {
            return Score.WORSE;
        } else {
            return Score.SIMILAR;
        } // should never happen
    }

    newInstance(context: Context): ConcreteInstance {
        const decl = context.getRegisteredDeclaration<ConcreteCategoryDeclaration>(ConcreteCategoryDeclaration, this.id);
        if(decl)
            return decl.newInstance(context)
        else
            throw new InternalError("Could not instantiate " + this.name);
    }

    getSortedComparator(context: Context, desc: boolean, key: IExpression): (o1: IValue, o2: IValue) => number {
        if(key instanceof ArrowExpression) {
            return key.getSortedComparator(context, this, desc);
        } else {
            const keyId = this.getKeyIdentifier(key);
            if (!key)
                key = new UnresolvedIdentifier(keyId);
            const decl = this.getDeclaration(context);
            if (decl instanceof CategoryDeclaration) {
                if (decl.hasAttribute(context, keyId)) {
                    return this.getAttributeSortedComparator(context, keyId, desc);
                } else if (decl.hasMethod(context, keyId)) {
                    return this.getMemberMethodSortedComparator(context, keyId, desc);
                } else {
                    const method = this.findGlobalMethod(context, keyId);
                    if (method != null) {
                        return this.getGlobalMethodSortedComparator(context, method, desc);
                    } else {
                        return this.getExpressionSortedComparator(context, key, desc);
                    }
                }
            } else
                return null;
        }
    }

    getExpressionSortedComparator(context: Context, exp: IExpression, desc: boolean) {
        return (o1: IValue, o2: IValue) => {
            let ctx = context.newInstanceContext(o1, null);
            const value1 = exp.interpret(ctx);
            ctx = context.newInstanceContext(o2, null);
            const value2 = exp.interpret(ctx);
            return desc ? compareValues(value2, value1) : compareValues(value1, value2);
        };
    }

    getAttributeSortedComparator(context: Context, id: Identifier, desc: boolean) {
        if(desc)
            return (o1: IValue, o2: IValue) => {
                const value1 = o1.getMemberValue(context, id);
                const value2 = o2.getMemberValue(context, id);
                return compareValues(value2, value1);
            };
        else
            return (o1: IValue, o2: IValue) => {
                const value1 = o1.getMemberValue(context, id);
                const value2 = o2.getMemberValue(context, id);
                return compareValues(value1, value2);
            };
    }

    getGlobalMethodSortedComparator(context, method, desc) {
        const cmp = function(o1, o2) {
            const argument = method.args[0];
            argument._expression = new ValueExpression(this, o1);
            const value1 = method.interpret(context);
            argument._expression = new ValueExpression(this, o2);
            const value2 = method.interpret(context);
            return desc ? compareValues(value2, value1) : compareValues(value1, value2);
        };
        return cmp.bind(this);
    }

    getMemberMethods(context: Context, id: Identifier): Set<IMethodDeclaration> {
        const decl = this.getDeclaration(context);
       if (decl instanceof ConcreteCategoryDeclaration) {
           const methods = decl.getMemberMethodsMap(context, id);
           return new Set<IMethodDeclaration>(methods ? methods.getAll() : []);
       } else {
           context.problemListener.reportUnknownCategory(this.id, id.name);
           return new Set<IMethodDeclaration>();
        }
    }

    getStaticMemberMethods(context: Context, id: Identifier): IMethodDeclaration[] {
        const decl = this.getDeclaration(context);
        if(decl instanceof EnumeratedCategoryDeclaration || decl instanceof EnumeratedNativeDeclaration)
            return decl.getType(context).getStaticMemberMethods(context, id);
        else if(decl instanceof SingletonCategoryDeclaration)
            return decl.getType(context).getMemberMethods(context, id);
        else if (decl instanceof ConcreteCategoryDeclaration) {
            const methods = decl.getMemberMethodsMap(context, id);
            return methods ? methods.getAll() : null;
        } else {
            context.problemListener.reportUnknownCategory(this.id, this.name);
            return null;
        }
    }

    /* look for a method which takes this category as sole parameter */
    findGlobalMethod(context, id, returnDecl) {
        try {
            const exp = new ValueExpression(this, this.newInstance(context));
            const arg = new Argument(null, exp);
            const args = new ArgumentList([arg]);
            const call = new MethodCall(new MethodSelector(null, id), args);
            call.copySectionFrom(id);
            const finder = new MethodFinder(context, call);
            const decl = finder.findBest(true);
            return decl==null ? null : returnDecl ? decl : call;
        } catch (e) {
            if(e instanceof PromptoError) {
                return null;
            } else {
                throw e;
            }
        }
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        const decl = this.getDeclaration(context);
        if (decl == null)
            return super.convertPythonValueToPromptoValue(context, value, returnType);
        if(decl instanceof EnumeratedNativeDeclaration || decl instanceof EnumeratedCategoryDeclaration)
            return this.loadEnumValue(context, decl, value);
        if ($DataStore.instance.isDbIdType(typeof(value)))
            value = $DataStore.instance.fetchUnique(value);
        return decl.newInstanceFromStored(context, value);
    }

    loadEnumValue(context, value, name) {
        return context.getRegisteredValue(new Identifier(name));
    }

    declareSorted(transpiler, key) {
        const keyId = this.getKeyIdentifier(key);
        let decl = this.getDeclaration(transpiler.context);
        if (!(decl.hasAttribute(transpiler.context, keyId) || decl.hasMethod(transpiler.context, keyId, null))) {
            decl = this.findGlobalMethod(transpiler.context, keyId, true);
            if (decl != null) {
                decl.declare(transpiler);
            } else if(key instanceof ArrowExpression) {
                // TODO
            } else {
                key.declare(transpiler);
            }
        }
    }

    getKeyIdentifier(key) {
        if(key instanceof InstanceExpression)
            return key.id;
        else if(key instanceof Section) {
            const keyId = new Identifier(key.toString());
            keyId.copySectionFrom(key);
            return keyId;
        } else if(key != null)
            return new Identifier(key.toString());
        else
            return new Identifier("key");
    }

    transpileSortedComparator(transpiler, key, desc) {
        const keyId = this.getKeyIdentifier(key);
        let decl = this.getDeclaration(transpiler.context);
        if (decl.hasAttribute(transpiler.context, keyId.toString())) {
            this.transpileAttributeSortedComparator(transpiler, key, desc);
        } else if (decl.hasMethod(transpiler.context, keyId.toString(), null)) {
            this.transpileMemberMethodSortedComparator(transpiler, key, desc);
        } else {
            decl = this.findGlobalMethod(transpiler.context, keyId, true);
            if (decl != null) {
                this.transpileGlobalMethodSortedComparator(transpiler, decl.getTranspiledName(transpiler.context), desc);
            } else if(key instanceof ArrowExpression) {
                return key.transpileSortedComparator(transpiler, this, desc);
            } else {
                this.transpileExpressionSortedComparator(transpiler, key, desc);
            }
        }
    }

    transpileExpressionSortedComparator(transpiler, key, desc) {
        this.transpileAttributeSortedComparator(transpiler, key, desc);
    }

    transpileAttributeSortedComparator(transpiler, key, desc) {
        key = key || new InstanceExpression(new Identifier("key"));
        transpiler.append("function(o1, o2) { return ");
        this.transpileEqualKeys(transpiler, key);
        transpiler.append(" ? 0 : ");
        this.transpileGreaterKeys(transpiler, key);
        transpiler.append(" ? ");
        if(desc)
            transpiler.append("-1 : 1; }");
        else
            transpiler.append("1 : -1; }");
    }

    transpileEqualKeys(transpiler, key) {
        transpiler.append("o1.");
        key.transpile(transpiler);
        transpiler.append(" === o2.");
        key.transpile(transpiler);
    }

    transpileGreaterKeys(transpiler, key) {
        transpiler.append("o1.");
        key.transpile(transpiler);
        transpiler.append(" > o2.");
        key.transpile(transpiler);
    }

    transpileGlobalMethodSortedComparator(transpiler, name, desc) {
        transpiler.append("function(o1, o2) { return ")
            .append(name).append("(o1) === ").append(name).append("(o2)").append(" ? 0 : ")
            .append(name).append("(o1) > ").append(name).append("(o2)").append(" ? ");
        if(desc)
            transpiler.append("-1 : 1; }");
        else
            transpiler.append("1 : -1; }");
    }

    transpileAssignMemberValue(transpiler, name, expression) {
        const decl = transpiler.context.getRegisteredDeclaration(name);
        transpiler.append(".setMember('")
            .append(name)
            .append("', ");
        expression.transpile(transpiler);
        transpiler.append(", ")
            .append(decl.storable)
            .append(", ");
        const type = expression.check(transpiler.context);
        transpiler.append("" + type.isMutable());
        if(type instanceof EnumeratedCategoryType || type instanceof EnumeratedNativeType)
            transpiler.append(", true"); // set isEnum flag
        else
            transpiler.append(", false"); // set isEnum flag
        transpiler.append(")");
    }
}
