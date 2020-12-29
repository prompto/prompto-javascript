import BaseType from './BaseType.js'
import { AnyType, NativeType, TextType, MethodType, VoidType, NullType, MissingType,
    EnumeratedCategoryType, EnumeratedNativeType } from './index.js'
import { CategoryDeclaration, ConcreteCategoryDeclaration, SingletonCategoryDeclaration, 
    EnumeratedNativeDeclaration, EnumeratedCategoryDeclaration } from '../declaration/index.js'
import { PromptoError } from '../error/index.js'
import { UnresolvedIdentifier, ValueExpression, MethodSelector, ArrowExpression, InstanceExpression } from '../expression/index.js'
import { Operator, Identifier, Argument, ArgumentList } from '../grammar/index.js'
import { MethodDeclarationMap, MethodFinder, Score } from '../runtime/index.js'
import { MethodCall } from '../statement/index.js'
import { $DataStore } from '../store/index.js'
import { compareValues } from '../utils/index.js'
import { SyntaxError } from '../error/index.js'
const Any = require('../intrinsic/Any.js').default;
const Category = require('../intrinsic/$Root.js').Category;

export default class CategoryType extends BaseType {
  
    constructor(id, mutable) {
        super(id);
        this.mutable = mutable || false;
    }

    isMutable(context) {
        return this.mutable;
    }

    asMutable(context, mutable) {
        if(mutable == this.mutable)
            return this;
        else
            return new CategoryType(this.id, mutable);
    }

    isStorable(context) {
        const decl = this.getDeclaration(context);
        return decl.isStorable && decl.isStorable(context);
    }

    anyfy() {
        if (this.name === "Any")
            return AnyType.instance;
        else
            return this;
    }

    resolve(context, onError) {
        const type = this.anyfy();
        if(type instanceof NativeType)
            return type;
        const decl = context.getRegisteredDeclaration(type.name);
        if(!decl) {
            if(onError)
                onError(type);
            else
                context.problemListener.reportUnknownCategory(this.id);
            return AnyType.instance; // don't propagate error
        } else if(decl instanceof MethodDeclarationMap)
            return new MethodType(decl.getFirst());
        else
            return decl.getType(context);
    }

    toDialect(writer, skipMutable) {
        if (this.mutable && !skipMutable)
            writer.append("mutable ");
        writer.append(this.name);
    }

    getSuperType(context, section) {
        const decl = this.getDeclaration(context);
        if(decl instanceof CategoryDeclaration) {
            const derived = decl.derivedFrom;
            if(derived && derived.length)
                return new CategoryType(derived[0]);
        }
        context.problemListener.reportNoSuperType(section, this);
    }

    declare(transpiler) {
        if(this.name==="Any") {
            transpiler.require(Any);
        } else  {
            const decl = this.getDeclaration(transpiler.context);
            decl.declare(transpiler);
        }
    }

    transpile(transpiler) {
        transpiler.append(this.name);
    }

    transpileInstance(transpiler) {
        const decl = this.getDeclaration(transpiler.context);
        if(decl instanceof SingletonCategoryDeclaration)
            transpiler.append(this.name).append(".instance");
        else
            transpiler.append("this");
    }

    newInstanceFromStored(context, stored) {
        const decl = this.getDeclaration(context);
        const inst = decl.newInstanceFromStored(context, stored);
        inst.mutable = this.mutable;
        return inst;
    }

    checkUnique(context) {
        const actual = context.getRegisteredDeclaration(this.name) || null;
        if(actual!=null) {
            throw new SyntaxError("Duplicate name: \"" + this.name + "\"");
        }
    }

    getDeclaration(context) {
        const decl = context.getRegisteredDeclaration(this.name) || null;
        if(decl==null) {
            if(context.problemListener)
                context.problemListener.reportUnknownCategory(this.id);
            else
                throw new SyntaxError("Unknown category: \"" + this.name + "\"");
        }
        return decl;
    }

    checkMultiply(context, other, tryReverse) {
        const type = this.checkOperator(context, other, tryReverse, Operator.MULTIPLY);
        if(type!=null)
            return type;
        else
            return super.checkMultiply(context, other, tryReverse);
    }

    declareMultiply(transpiler, other, tryReverse, left, right) {
        const type = this.checkOperator(transpiler.context, other, tryReverse, Operator.MULTIPLY);
        if(type!=null) {
            left.declare(transpiler);
            right.declare(transpiler);
            type.declare(transpiler);
        } else
            return super.declareMultiply(transpiler, other, tryReverse, left, right);
    }

    transpileMultiply(transpiler, other, tryReverse, left, right) {
        const type = this.checkOperator(transpiler.context, other, tryReverse, Operator.MULTIPLY);
        if(type!=null) {
            left.transpile(transpiler);
            transpiler.append(".operator_MULTIPLY").append("$").append(other.getTranspiledName(transpiler.context)).append("(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileMultiply(transpiler, other, tryReverse, left, right);

    }

    checkDivide(context, other) {
        const type = this.checkOperator(context, other, false, Operator.DIVIDE);
        if(type!=null)
            return type;
        else
            return super.checkDivide(context, other);
    }

    declareDivide(transpiler, other, left, right) {
        const type = this.checkOperator(transpiler.context, other, false, Operator.DIVIDE);
        if(type!=null) {
            left.declare(transpiler);
            right.declare(transpiler);
            type.declare(transpiler);
        } else
            return super.declareDivide(transpiler, other, left, right);
    }

    transpileDivide(transpiler, other, left, right) {
        left.transpile(transpiler);
        transpiler.append(".operator_DIVIDE").append("$").append(other.getTranspiledName(transpiler.context)).append("(");
        right.transpile(transpiler);
        transpiler.append(")");
    }

    checkIntDivide(context, other) {
        const type = this.checkOperator(context, other, false, Operator.IDIVIDE);
        if(type!=null)
            return type;
        else
            return super.checkIntDivide(context, other);
    }

    declareIntDivide(transpiler, other, left, right) {
        const type = this.checkOperator(transpiler.context, other, false, Operator.IDIVIDE);
        if(type!=null) {
            left.declare(transpiler);
            right.declare(transpiler);
            type.declare(transpiler);
        } else
            return super.declareDivide(transpiler, other, left, right);
    }

    transpileIntDivide(transpiler, other, left, right) {
        left.transpile(transpiler);
        transpiler.append(".operator_IDIVIDE").append("$").append(other.getTranspiledName(transpiler.context)).append("(");
        right.transpile(transpiler);
        transpiler.append(")");
    }

    checkModulo(context, other) {
        const type = this.checkOperator(context, other, false, Operator.MODULO);
        if(type!=null)
            return type;
        else
            return super.checkModulo(context, other);
    }

    declareModulo(transpiler, other, left, right) {
        const type = this.checkOperator(transpiler.context, other, false, Operator.MODULO);
        if(type!=null) {
            left.declare(transpiler);
            right.declare(transpiler);
            type.declare(transpiler);
        } else
            return super.declareModulo(transpiler, other, left, right);
    }

    transpileModulo(transpiler, other, left, right) {
        left.transpile(transpiler);
        transpiler.append(".operator_MODULO").append("$").append(other.getTranspiledName(transpiler.context)).append("(");
        right.transpile(transpiler);
        transpiler.append(")");
    }

    checkAdd(context, other, tryReverse) {
        const type = this.checkOperator(context, other, tryReverse, Operator.PLUS);
        if(type!=null)
            return type;
        else
            return super.checkAdd(context, other, tryReverse);
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        const type = this.checkOperator(transpiler.context, other, tryReverse, Operator.PLUS);
        if(type!=null) {
            left.declare(transpiler);
            right.declare(transpiler);
            type.declare(transpiler);
        } else
            return super.declareAdd(transpiler, other, tryReverse, left, right);
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        left.transpile(transpiler);
        transpiler.append(".operator_PLUS").append("$").append(other.getTranspiledName(transpiler.context)).append("(");
        right.transpile(transpiler);
        transpiler.append(")");
    }

    checkSubtract(context, other) {
        const type = this.checkOperator(context, other, false, Operator.MINUS);
        if(type!=null)
            return type;
        else
            return super.checkSubtract(context, other);
    }

    declareSubtract(transpiler, other, left, right) {
        const type = this.checkOperator(transpiler.context, other, false, Operator.MINUS);
        if(type!=null) {
            left.declare(transpiler);
            right.declare(transpiler);
            type.declare(transpiler);
        } else
            return super.declareDivide(transpiler, other, left, right);
    }

    transpileSubtract(transpiler, other, left, right) {
        left.transpile(transpiler);
        transpiler.append(".operator_MINUS").append("$").append(other.getTranspiledName(transpiler.context)).append("(");
        right.transpile(transpiler);
        transpiler.append(")");
    }

    checkOperator(context, other, tryReverse, operator) {
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

    checkExists(context) {
        this.getDeclaration(context);
    }

    checkMember(context, section, name) {
        if( "category" === name)
            return new CategoryType(new Identifier("Category"));
        const decl = context.getRegisteredDeclaration(this.name);
        if (decl == null) {
            context.problemListener.reportUnknownCategory(this.id);
            return VoidType.instance;
        }
        if (decl instanceof EnumeratedNativeDeclaration) {
            return decl.getType(context).checkMember(context, section, name);
        } else if (decl instanceof CategoryDeclaration) {
            return this.checkCategoryMember(context, section, decl, name);
        } else {
            context.problemListener.reportUnknownCategory(this.id);
            return VoidType.instance;
        }
    }

    checkCategoryMember(context, section, decl, name) {
        if(decl.storable && "dbId" === name)
            return AnyType.instance;
        else if (decl.hasAttribute(context, name)) {
            const ad = context.getRegisteredDeclaration(name);
            if (ad == null) {
                throw new SyntaxError("Unknown attribute:" + name);
            }
            return ad.getType(context);
        } else if ("text" == name) {
            return TextType.instance
        } else if (decl.hasMethod(context, name)) {
            const method = decl.getMemberMethodsMap(context, name).getFirst();
            return new MethodType(method);
        } else {
            context.problemListener.reportUnknownAttribute(section);
            return AnyType.instance;
        }
    }

    declareMember(transpiler, section, name) {
        if( "category" === name ) {
            transpiler.require(Category);
        }
        // TODO visit attributes
    }

    transpileMember(transpiler, name) {
        if ("text" === name)
            transpiler.append("getText()");
        else
            transpiler.append(name);
    }

    checkStaticMember(context, section, id) {
        const decl = context.getRegisteredDeclaration(this.name);
        if(decl==null) {
            context.problemListener.reportUnknownIdentifier(this.name, this);
            return null;
        } else if(decl instanceof EnumeratedCategoryDeclaration || decl instanceof EnumeratedNativeDeclaration) {
            return decl.getType(context).checkStaticMember(context, section, id);
        } else if(decl instanceof SingletonCategoryDeclaration) {
            return this.checkCategoryMember(context, section, decl, id);
        } else {
            context.getProblemListener().reportUnknownAttribute(id);
            return null;
        }
    }

    declareStaticMember(transpiler, section, name) {
        // TODO visit attributes
    }

    transpileStaticMember(transpiler, name) {
        if(this.getDeclaration(transpiler.context) instanceof SingletonCategoryDeclaration)
            transpiler.append("instance.");
        transpiler.append(name);
    }

    getStaticMemberValue(context, name) {
        const decl = this.getDeclaration(context);
        if(decl instanceof EnumeratedCategoryDeclaration || decl instanceof EnumeratedNativeDeclaration)
            return decl.getType(context).getStaticMemberValue(context, name);
        else if(decl instanceof SingletonCategoryDeclaration) {
            const singleton = context.loadSingleton(this);
            return singleton.getMemberValue(context, name);
        } else
            return super.getStaticMemberValue(context, name);
    }

    isAssignableFrom(context, other) {
        return super.isAssignableFrom(context, other)
            || ((other instanceof CategoryType) && this.isAssignableFromCategory(context, other));
    }

    isAssignableFromCategory(context, other) {
        return "Any"===this.name
                || other.isDerivedFrom(context, this)
                || other.isDerivedFromAnonymous(context, this);
    }

    isDerivedFrom(context, other) {
        try {
            const thisDecl = this.getDeclaration(context);
            if (thisDecl instanceof CategoryDeclaration)
                return this.isDerivedFromCategory(context, thisDecl, other);
        } catch (e) {
            /* eslint no-empty: [ "off" ] */
        }
        return false; // TODO
    }

    isDerivedFromCategory(context, decl, other) {
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

    isDerivedFromAnonymous(context, other) {
        if (!(other instanceof CategoryType) || !other.isAnonymous())
            return false;
        try {
            const thisDecl = this.getDeclaration(context);
            if (thisDecl instanceof CategoryDeclaration) {
                const otherDecl = other.getDeclaration(context);
                if (otherDecl instanceof CategoryDeclaration)
                    return this.isDerivedFromAnonymousCategory(context, thisDecl, otherDecl);
            }
        } catch (e) {
            if (e instanceof SyntaxError) {
                return false;
            } else {
                throw e;
            }
        }
    }

    isDerivedFromAnonymousCategory(context, thisDecl, otherDecl) {
        // an anonymous category extends 1 and only 1 category
        const baseId = otherDecl.derivedFrom[0];
        // check we derive from root category (if not extending 'Any')
        if("any"!=baseId.name && !thisDecl.isDerivedFrom(context,new CategoryType(baseId)))
            return false;
        const allAttributes = otherDecl.getAllAttributes(context);
        for(const attr of allAttributes) {
            if(!thisDecl.hasAttribute(context, attr.name)) {
                return false;
            }
        }
        return true;
    }

    isAnonymous() {
        return this.name[0]==this.name[0].toLowerCase(); // since it's the name of the argument
    }

    isMoreSpecificThan(context, other) {
        if(other instanceof NullType || other instanceof AnyType || other instanceof MissingType)
            return true;
        if(!(other instanceof CategoryType)) {
            return false;
        }
        if(other.isAnonymous()) {
            return true;
        }
        const thisDecl = context.getRegisteredDeclaration(this.name);
        if(thisDecl.isDerivedFrom(context, other)) {
            return true;
        } else {
            return false;
        }
    }

    scoreMostSpecific(context, t1, t2) {
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

    newInstance(context) {
        const decl = context.getRegisteredDeclaration(this.name);
        return decl.newInstance(context);
    }

    getSortedComparator(context, key, desc) {
        key = key || null;
        if (key == null)
            key = new UnresolvedIdentifier(new Identifier("key"));
        const keyname = key.toString();
        const decl = this.getDeclaration(context);
        if (decl.hasAttribute(context, keyname)) {
            return this.getAttributeSortedComparator(context, keyname, desc);
        } else if (decl.hasMethod(context, keyname)) {
            return this.getMemberMethodSortedComparator(context, keyname, desc);
        } else {
            const method = this.findGlobalMethod(context, keyname);
            if(method!=null) {
                return this.getGlobalMethodSortedComparator(context, method, desc);
            } else if(key instanceof ArrowExpression) {
                return key.getSortedComparator(context, this, desc);
            } else {
                return this.getExpressionSortedComparator(context, key, desc);
            }
        }
    }

    getExpressionSortedComparator(context, exp, desc) {
        return (o1, o2) => {
            let ctx = context.newInstanceContext(o1, null);
            const value1 = exp.interpret(ctx);
            ctx = context.newInstanceContext(o2, null);
            const value2 = exp.interpret(ctx);
            return desc ? compareValues(value2, value1) : compareValues(value1, value2);
        };
    }

    getAttributeSortedComparator(context, name, desc) {
        if(desc)
            return (o1, o2) => {
                const value1 = o1.getMemberValue(context, name);
                const value2 = o2.getMemberValue(context, name);
                return compareValues(value2, value1);
            };
        else
            return (o1, o2) => {
                const value1 = o1.getMemberValue(context, name);
                const value2 = o2.getMemberValue(context, name);
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

    getMemberMethods(context, name) {
        const decl = this.getDeclaration(context);
       if (!(decl instanceof ConcreteCategoryDeclaration))
            throw new SyntaxError("Unknown category:" + this.name);
        else {
            const methods = decl.getMemberMethodsMap(context, name);
            return methods.getAll();
        }
    }

    getStaticMemberMethods(context, name) {
        const decl = this.getDeclaration(context);
        if(decl instanceof EnumeratedCategoryDeclaration || decl instanceof EnumeratedNativeDeclaration)
            return decl.getType(context).getStaticMemberMethods(context, name);
        else if(decl instanceof SingletonCategoryDeclaration)
            return decl.getType(context).getMemberMethods(context, name);
        else if (decl instanceof ConcreteCategoryDeclaration) {
            const methods = decl.getMemberMethodsMap(context, name);
            return methods.getAll();
        } else
            throw new SyntaxError("Unknown category:" + this.name);
    }

    /* look for a method which takes this category as sole parameter */
    findGlobalMethod(context, name, returnDecl) {
        try {
            const exp = new ValueExpression(this, this.newInstance(context));
            const arg = new Argument(null, exp);
            const args = new ArgumentList([arg]);
            const call = new MethodCall(new MethodSelector(null, new Identifier(name)), args);
            const finder = new MethodFinder(context, call);
            const decl = finder.findMethod(true);
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
        return context.getRegisteredValue(name);
    }

    declareSorted(transpiler, key) {
        const keyname = key ? key.toString() : "key";
        let decl = this.getDeclaration(transpiler.context);
        if (decl.hasAttribute(transpiler.context, keyname) || decl.hasMethod(transpiler.context, keyname, null)) {
            return;
        } else {
            decl = this.findGlobalMethod(transpiler.context, keyname, true);
            if (decl != null) {
                decl.declare(transpiler);
            } else if(key instanceof ArrowExpression) {
                // TODO
            } else {
                key.declare(transpiler);
            }
        }
    }

    transpileSortedComparator(transpiler, key, desc) {
        const keyname = key ? key.toString() : "key";
        let decl = this.getDeclaration(transpiler.context);
        if (decl.hasAttribute(transpiler.context, keyname)) {
            this.transpileAttributeSortedComparator(transpiler, key, desc);
        } else if (decl.hasMethod(transpiler.context, keyname, null)) {
            this.transpileMemberMethodSortedComparator(transpiler, key, desc);
        } else {
            decl = this.findGlobalMethod(transpiler.context, keyname, true);
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
            .append(", false"); // not mutable
        const type = expression.check(transpiler.context);
        if(type instanceof EnumeratedCategoryType || type instanceof EnumeratedNativeType)
            transpiler.append(", true"); // set isEnum flag
        else
            transpiler.append(", false"); // set isEnum flag
        transpiler.append(")");
    }
}
