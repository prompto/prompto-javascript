import {Score, MethodDeclarationMap, Context} from './index'
import { CategoryType, MethodType } from '../type'
import { PromptoError, SyntaxError } from '../error'
import { ProblemRaiser } from '../problem';
import {ClosureValue, ArrowValue, Instance} from '../value';
import {ConcreteCategoryDeclaration, ClosureDeclaration, ArrowDeclaration, IMethodDeclaration} from '../declaration'
import {MethodCall} from "../statement";

export default class MethodFinder {

    context: Context;
    methodCall: MethodCall;

    constructor(context: Context, methodCall: MethodCall) {
        this.context = context;
        this.methodCall = methodCall;
   }

   findCandidates(checkInstance: boolean): Set<IMethodDeclaration> {
        return new Set<IMethodDeclaration>([...this.findMemberCandidates(checkInstance), ...this.findGlobalCandidates()]);
   }

   findMemberCandidates(checkInstance: boolean): Set<IMethodDeclaration> {
       const selector = this.methodCall.selector;
       if(selector.parent == null) {
           // if called from a member method, could be a member method called without this/self
           const instance = this.context.getClosestInstanceContext();
           if(instance) {
               const type = instance.instanceType;
               const decl = this.context.getRegistered(type.id);
               if(decl instanceof ConcreteCategoryDeclaration) {
                   const members = decl.getMemberMethods(this.context, selector.id, true);
                   if(members != null)
                       return new Set<IMethodDeclaration>([...members.getAll()]);
               }
           }
           return new Set();
       } else {
           const parentType = selector.checkParentType(this.context, checkInstance);
           return parentType.getMemberMethods(this.context, selector.id);
       }
   }

    findGlobalCandidates(): Set<IMethodDeclaration> {
        const selector = this.methodCall.selector;
        if(selector.parent != null)
            return new Set<IMethodDeclaration>();
        const globals = this.context.getRegistered(selector.id);
        const methods = globals instanceof MethodDeclarationMap ? globals.getAll() : [];
        return new Set<IMethodDeclaration>([...methods]);
}


    findBest(checkInstance: boolean): IMethodDeclaration | null {
       const allCandidates = new Set<IMethodDeclaration>();
       let decl = this.findBestReference(allCandidates, checkInstance);
       if (decl)
           return decl;
       decl = this.findBestMethod(allCandidates, checkInstance);
       if (decl)
           return decl;
       if (allCandidates.size == 0)
           this.context.problemListener.reportUnknownMethod(this.methodCall.selector.id, this.methodCall.selector.name);
       else
           this.context.problemListener.reportNoMatchingPrototype(this.methodCall, this.methodCall.toString(), [...allCandidates].map(m => m.getSignature()));
       return null;
   }

    findBestReference(candidates: Set<IMethodDeclaration>, checkInstance: boolean): IMethodDeclaration | null {
        const candidate = this.findCandidateReference(checkInstance);
        if(!candidate)
            return null;
        candidates.add(candidate);
        const compatibles = this.filterCompatible(new Set<IMethodDeclaration>([candidate]), checkInstance, false);
        return compatibles.size > 0 ? [...compatibles][0] : null;
    }

    findCandidateReference(checkInstance: boolean): IMethodDeclaration | null {
        const selector = this.methodCall.selector;
        if(selector.parent != null)
            return null;
        if(checkInstance) {
            if(this.context.hasValue(selector.id)) {
                const value = this.context.getValue(selector.id);
                if(value instanceof ClosureValue)
                    return this.getClosureDeclaration(this.context, value);
                else if (value instanceof ArrowValue)
                    return this.getArrowDeclaration(value);
            }
        } else {
            const named = this.context.getLocalInstance(selector.id, true);
            if(!named)
                return null;
            const type = named.getType(this.context).resolve(this.context);
            if(type instanceof MethodType)
                return type.method.asReference();
        }
        return null;
    }

    getArrowDeclaration(value: ArrowValue) {
        return new ArrowDeclaration(value);
    }

    getClosureDeclaration(context: Context, closure: ClosureValue) {
        const decl = (closure.type as MethodType).method;
        if(decl.memberOf != null) {
            // the closure references a member method (useful when a method reference is needed)
            // in which case we may simply want to return that method to avoid spilling context into method body
            // this is only true if the closure comes straight from the method's instance context
            // if the closure comes from an accessible context that is not the instance context
            // then it is a local variable that needs the closure context to be interpreted
            const selector = this.methodCall.selector;
            const declaring = this.context.contextForValue(selector.id);
            if( declaring == closure.context)
                return decl;
        }
        return new ClosureDeclaration(closure);
    }

    findBestMethod(allCandidates: Set<IMethodDeclaration>, checkInstance: boolean) {
        const candidates = this.findCandidates(checkInstance);
        candidates.forEach(c => allCandidates.add(c));
        const compatibles = this.filterCompatible(candidates, checkInstance, false);
        switch (compatibles.size) {
            case 0:
                return null;
            case 1:
                return compatibles.values().next().value as IMethodDeclaration;
            default:
                return this.findMostSpecific(compatibles, checkInstance);
        }
    }

    findMostSpecific(candidates: Set<IMethodDeclaration>, checkInstance: boolean): IMethodDeclaration | null {
        let candidate: IMethodDeclaration | null  = null;
        let ambiguous = [];
        for(const c of candidates.values()) {
            if(candidate==null)
                candidate = c;
            else {
                // noinspection JSPotentiallyInvalidUsageOfClassThis
                const score = this.compareSpecifity(candidate, c, checkInstance, false);
                switch(score) {
                case Score.WORSE:
                    candidate = c;
                    ambiguous = [];
                    break;
                case Score.BETTER:
                    break;
                case Score.SIMILAR:
                    ambiguous.push(c);
                    break;
                }
            }
        }
        if(ambiguous.length > 0) {
            this.context.problemListener.reportTooManyPrototypes(this.methodCall, this.methodCall);
        }
        return candidate;
    }

    sortMostSpecificFirst(declarations: Set<IMethodDeclaration>): IMethodDeclaration[] {
        const sorted = Array.from(declarations);
        sorted.sort((d1, d2) => {
            const score = this.compareSpecifity(d2, d1, false, true);
            return score;
        });
        return sorted;
    }

    compareSpecifity(decl1: IMethodDeclaration, decl2: IMethodDeclaration, checkInstance: boolean, allowDerived: boolean): Score {
        try {
            const ctx1 = this.context.newLocalContext();
            decl1.registerParameters(ctx1);
            const ctx2 = this.context.newLocalContext();
            decl2.registerParameters(ctx2);
            const ass1 = this.methodCall.makeArguments(this.context, decl1);
            const ass2 = this.methodCall.makeArguments(this.context, decl2);
            for(let i=0;i<ass1.length && i<ass2.length;i++) {
                const as1 = ass1[i];
                const as2 = ass2[i];
                const arg1 = decl1.parameters!.findByName(as1.name!);
                const arg2 = decl2.parameters!.findByName(as2.name!);
                if(as1.name==as2.name) {
                    // the general case with named arguments
                    const typ1 = arg1.getType(ctx1);
                    const typ2 = arg2.getType(ctx2);
                    // try resolving runtime type
                    if(checkInstance && typ1 instanceof CategoryType && typ2 instanceof CategoryType) {
                        const value = as1.expression.interpret(this.context); // in the named case as1==as2, so only evaluate 1
                        if(value instanceof Instance) {
                            const actual = value.getType() as CategoryType;
                            const score = actual.compareSpecifity(this.context, typ1, typ2);
                            if(score!=Score.SIMILAR) {
                                return score;
                            }
                        }
                    }
                    if(typ1.isMoreSpecificThan(ctx2, typ2))
                        return Score.BETTER;
                    else if(typ2.isMoreSpecificThan(ctx1, typ1))
                        return Score.WORSE;
                } else {
                    // specific case for single anonymous argument
                    const sp1 = decl1.computeSpecificity(ctx1, arg1, as1, checkInstance, allowDerived);
                    const sp2 = decl2.computeSpecificity(ctx2, arg2, as2, checkInstance, allowDerived);
                    if (sp1 > sp2)
                        return Score.BETTER;
                    else if (sp2 > sp1) {
                        return Score.WORSE;
                    }
                }
            }
        } catch(error) {
            if(!(error instanceof PromptoError)) {
                throw error;
            }
        }
        return Score.SIMILAR;
    }

    filterCompatible(candidates: Set<IMethodDeclaration>, checkInstance: boolean, allowDerived: boolean): Set<IMethodDeclaration> {
        try {
            this.context.pushProblemListener(new ProblemRaiser());
            return this.doFilterCompatible(candidates, checkInstance, allowDerived);
        } finally {
            this.context.popProblemListener();
        }
    }

    doFilterCompatible(candidates: Set<IMethodDeclaration>, checkInstance: boolean, allowDerived: boolean): Set<IMethodDeclaration> {
        const compatibles = new Set<IMethodDeclaration>();
        candidates.forEach(decl => {
            try {
                const args = this.methodCall.makeArguments(this.context, decl);
                if(decl.isAssignableTo(this.context, args, checkInstance, allowDerived)) {
                    compatibles.add(decl);
                }
            } catch(e) {
                if(!(e instanceof SyntaxError)) {
                    throw e;
                }
                // else OK
            }
        }, this);
        return compatibles;
    }

    findPotential(checkInstance = false): Set<IMethodDeclaration> {
        const candidates = this.findCandidates(false);
        if(!candidates.size)
            this.context.problemListener.reportUnknownMethod(this.methodCall.selector.id, this.methodCall.selector.name);
        return this.filterPotential(candidates);
    }

    filterPotential(candidates: Set<IMethodDeclaration>) {
        const potential = Array.from(candidates)
            .filter(decl => decl.isAssignableFrom(this.context, this.methodCall.makeArguments(this.context, decl)), this);
        return new Set<IMethodDeclaration>(potential);
    }

}

