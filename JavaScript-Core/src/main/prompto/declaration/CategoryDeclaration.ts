import BaseDeclaration from './BaseDeclaration'
import {
    AbstractMethodDeclaration,
    AttributeDeclaration,
    IMethodDeclaration
} from '../declaration'
import {CategoryType, IType} from '../type'
import {Context, MethodDeclarationMap} from "../runtime";
import {TextLiteral} from "../literal";
import {Annotation, Identifier, IdentifierList} from "../grammar";
import {IDeclarationInfo} from "../runtime/Catalog";
import {Instance} from "../value";
import {IStored} from "../store";
import {Section} from "../parser";
import {CodeWriter} from "../utils";
import ITranspilable from "../../../main/prompto/runtime/ITranspilable";
import {PropertyMap} from "../property";

export default abstract class CategoryDeclaration extends BaseDeclaration {

    attributes: IdentifierList | null;
    derivedFrom: IdentifierList | null;
    storable: boolean;
    
    constructor(id: Identifier, attributes?: IdentifierList | null, derivedFrom?: IdentifierList | null) {
        super(id);
        this.attributes = attributes || null;
        this.derivedFrom = derivedFrom || null;
        this.storable = false;
    }

    toDeclarationInfo(): IDeclarationInfo {
        return { name: this.name, dialect: this.dialect.name};
    }

    getDeclarationType(): string {
        return "Category";
    }

    isWidget(context: Context): boolean {
        return false;
    }

    getPageWidgetOf(): string | null {
        if(this.annotations) {
            const filtered = this.annotations.filter(a => a.id.name==="@PageWidgetOf");
            if(filtered.length > 0) {
                const expression = filtered[0].getDefaultArgument();
                if (expression instanceof TextLiteral) {
                    return expression.value.toString();
                }
            }
        }
        return null;
    }

    isStorable(context: Context): boolean {
        return this.storable || this.isDerivedFromStorable(context);
    }

    isDerivedFromStorable(context: Context): boolean {
        if(this.derivedFrom == null)
            return false;
        else
            return this.derivedFrom.findIndex(id => {
                const decl = context.getRegisteredCategoryDeclaration(id);
                return decl ? decl.isStorable(context) : false;
            }) >= 0;
    }

    abstract newInstance(context: Context): Instance<never>;

    newInstanceFromStored(context: Context, stored: IStored): Instance<never> {
        const instance = this.newInstance(context);
        instance.mutable = true;
        try {
            instance.setDbId(stored.dbId);
            const allAttributes = this.getAllAttributes(context, this);
            if(allAttributes) {
                allAttributes.forEach(id => {
                    const decl = context.getRegisteredCategoryDeclaration(id);
                    if (decl && decl.storable) {
                        if (stored.hasData(id.name)) {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            const data = stored.getData(id.name);
                            const value = decl.getType(context).convertJavaScriptValueToPromptoValue(context, data, null);
                            instance.setMember(context, id, value);
                        }
                    }
                }, this);
            }
        } finally {
            instance.mutable = false;
        }
        return instance;
    }

    getAllCategories(context: Context): string[] {
        const result = new Set<string>();
        this.collectCategories(context, result);
        return Array.from(result);
    }

    collectCategories(context: Context, result: Set<string>): void {
        if (this.derivedFrom != null) {
            this.derivedFrom.forEach(cat => {
                const decl = context.getRegisteredCategoryDeclaration(cat);
                if (decl)
                    decl.collectCategories(context, result);
            });
        }
        result.add(this.name);
    }

    getAllAttributes(context: Context, section: Section): Set<Identifier> | null {
        const result = new Set<Identifier>();
        this.collectAllAttributes(context, section, result);
        return result.size ? result : null;
    }

    protected collectAllAttributes(context: Context, section: Section, result: Set<Identifier>) {
        this.collectInheritedAttributes(context, section, result);
        this.collectLocalAttributes(context, section, result);
    }

    protected collectInheritedAttributes(context: Context, section: Section, result: Set<Identifier>) {
        if(this.derivedFrom)
            this.derivedFrom.forEach(id => {
                const decl = context.getRegisteredCategoryDeclaration(id);
                if(decl === null)
                    context.problemListener.reportInconsistentHierarchy(section, this.name, id.name);
                else
                    decl.collectAllAttributes(context, section, result);
            });

    }

    private collectLocalAttributes(context: Context, section: Section, result: Set<Identifier>): void {
        if(this.attributes)
            this.attributes.forEach(id => result.add(id));
    }

    getAllMethods(context: Context, section: Section): Map<string, MethodDeclarationMap> {
        const maps = new Map<string, MethodDeclarationMap>();
        this.collectAllMethods(context, section, maps);
        return maps;
    }

    collectAllMethods(context: Context, section: Section, maps: Map<string, MethodDeclarationMap>): void {
        this.collectInheritedMethods(context, section, maps);
        this.collectLocalMethods(context, section, maps);
    }

    collectInheritedMethods(context: Context, section: Section, maps: Map<string, MethodDeclarationMap>): void {
        if(this.derivedFrom)
            this.derivedFrom.forEach(id => {
                const decl = context.getRegisteredCategoryDeclaration(id);
                if(decl === null)
                    context.problemListener.reportInconsistentHierarchy(section, this.name, id.name);
                else
                    decl.collectAllMethods(context, section, maps);
            });
    }

    abstract getMemberMethodsMap(context: Context, id: Identifier): MethodDeclarationMap;
    abstract getLocalMethods(): IMethodDeclaration[];

    collectLocalMethods(context: Context, section: Section, maps: Map<string, MethodDeclarationMap>): void {
        this.getLocalMethods().forEach( method => {
            let localMap = maps.get(method.name);
            if(!localMap) {
                localMap = new MethodDeclarationMap(method.id);
                maps.set(method.name, localMap);
            }
            localMap.registerOrReplace(method);
        });
    }

    getAbstractMethods(context: Context, section: Section): AbstractMethodDeclaration[] {
        let abstract: AbstractMethodDeclaration[] = [];
        this.getAllMethods(context, section).forEach((map,key) => {
            const toAdd: AbstractMethodDeclaration[] = map.getAll().filter(method => method.isAbstract()) as unknown as AbstractMethodDeclaration[];
            abstract = abstract.concat(toAdd);
        });
        return abstract;
    }

    register(context: Context): void {
        context.registerDeclaration(this);
        this.registerMethods(context);
    }

    abstract registerMethods(context: Context): void;

    check(context: Context): IType {
        if(this.attributes!=null) {
            this.attributes.forEach(id => {
                const ad = context.getRegistered(id);
                if (ad == null) {
                    if(id.name != "text")
                        context.problemListener.reportUnknownAttribute(id, id.name);
                } else if (!(ad instanceof AttributeDeclaration))
                    context.problemListener.reportInvalidAttribute(this, id)
            });
        }
        return new CategoryType(this.id);
    }

    getType(context: Context): IType {
        return new CategoryType(this.id);
    }

    hasAttribute(context: Context, id: Identifier): boolean {
        if ("dbId" === id.name)
            return this.storable;
        else if (this.attributes == null)
            return false;
        else {
            const name = id.name;
            for (let i = 0; i < this.attributes.length; i++ ) {
                if ( name === this.attributes[i].name)
                    return true;
            }
            return false;
        }
    }

    abstract hasMethod(context: Context, id: Identifier): boolean;

    isDerivedFrom(context: Context, categoryType: IType) {
        return false;
    }

    getAllAnnotations(context: Context): Annotation[] {
        let annotations: Annotation[] = [];
        if (this.derivedFrom) {
            this.derivedFrom.forEach(name => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const decl = context.getRegisteredCategoryDeclaration(name);
                if (decl instanceof CategoryDeclaration) {
                    annotations = annotations.concat(decl.getAllAnnotations(context));
                }
            }, this);
        }
        if(this.annotations)
            annotations = annotations.concat(this.annotations);
        return annotations;
    }

    processAnnotations(context: Context, processDerivedFrom: boolean): void {
        const annotations = processDerivedFrom ? this.getAllAnnotations(context) : (this.annotations || []);
        annotations.forEach(function (ann) {
            ann.processCategory(context, this);
        }, this);
    }

    checkConstructorContext(context: Context): void {
        // nothing to do
    }

    toDialect(writer: CodeWriter): void {
        const type = this.getType(writer.context);
        writer = writer.newInstanceWriter(type);
        writer.toDialect(this);
    }

    abstract categoryTypeToEDialect(writer: CodeWriter): void;

    protoToEDialect(writer: CodeWriter, hasMethods: boolean, hasBindings: boolean): void {
        const hasAttributes = this.attributes!=null && this.attributes.length>0;
        writer.append("define ");
        writer.append(this.name);
        writer.append(" as ");
        if(this.storable)
            writer.append("storable ");
        this.categoryTypeToEDialect(writer);
        if(hasAttributes) {
            if(this.attributes!.length===1)
                writer.append(" with attribute ");
            else
                writer.append(" with attributes ");
            this.attributes!.toDialect(writer, true);
        }
        if(hasMethods) {
            if(hasAttributes)
                writer.append(", and methods:");
            else
                writer.append(" with methods:");
        } else if (hasBindings) {
            if(hasAttributes)
                writer.append(", and bindings:");
            else
                writer.append(" with bindings:");
        }
        writer.newLine();
    }

    methodsToEDialect(writer: CodeWriter, methods: IMethodDeclaration[]): void {
        writer.indent();
        methods.forEach(method => {
            writer.newLine();
            if(method.comments) {
                method.comments.forEach(cmt => cmt.toDialect(writer));
            }
            if(method.annotations) {
                method.annotations.forEach(ann => ann.toDialect(writer));
            }
            const w = writer.newMemberWriter();
            method.toEDialect(w);
        });
        writer.dedent();
    }

    methodsToODialect(writer: CodeWriter, methods: IMethodDeclaration[]): void {
        methods.forEach(method => {
            if(method.comments) {
                method.comments.forEach(cmt => cmt.toDialect(writer));
            }
            if(method.annotations) {
                method.annotations.forEach(ann => ann.toDialect(writer));
            }
            const w = writer.newMemberWriter();
            method.toODialect(w);
            w.newLine();
        });
    }

    allToODialect(writer: CodeWriter, hasBody: boolean): void {
        if(this.storable)
            writer.append("storable ");
        this.categoryTypeToODialect(writer);
        writer.append(" ").append(this.name);
        if(this.attributes!=null) {
            writer.append('(');
            this.attributes.toDialect(writer, true);
            writer.append(')');
        }
        this.categoryExtensionToODialect(writer);
        if(hasBody) {
            writer.append(" {").newLine().newLine().indent();
            this.bodyToODialect(writer);
            writer.dedent().append('}').newLine();
        } else
            writer.append(';');
    }

    abstract categoryTypeToODialect(writer: CodeWriter): void;
    abstract bodyToODialect(writer: CodeWriter): void;

    categoryExtensionToODialect(writer: CodeWriter): void {
        // by default no extension
    }

    protoToMDialect(writer: CodeWriter, derivedFrom: IdentifierList | null): void {
        if(this.storable)
            writer.append("storable ");
        this.categoryTypeToMDialect(writer);
        writer.append(" ").append(this.name).append("(");
        if(this.derivedFrom!=null) {
            this.derivedFrom.toDialect(writer, false);
            if(this.attributes!=null)
                writer.append(", ");
        }
        if(this.attributes!=null)
            this.attributes.toDialect(writer, false);
        writer.append("):").newLine();
    }
    abstract categoryTypeToMDialect(writer: CodeWriter): void;

    ensureDeclarationOrder(context: Context, list: ITranspilable[], set: Set<ITranspilable>) {
        if(set.has(this))
            return;
        if (this.derivedFrom != null) {
            this.derivedFrom.forEach(cat => {
                const decl = context.getRegisteredCategoryDeclaration(cat);
                if(decl)
                    decl.ensureDeclarationOrder(context, list, set);
            });
        }
        list.push(this);
        set.add(this);
    }


    getProperties(context: Context): PropertyMap | null {
        return null;
    }
}


