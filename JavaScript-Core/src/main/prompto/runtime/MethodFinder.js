import { Score } from './index.js'
import { CategoryType, MethodType } from '../type/index.js'
import { PromptoError, SyntaxError } from '../error/index.js'
import { ProblemRaiser } from '../problem/index.js';
import { ClosureValue, ArrowValue } from '../value/index.js';
import { ConcreteCategoryDeclaration, ClosureDeclaration, ArrowDeclaration } from '../declaration/index.js'
import { MethodDeclarationMap } from '../runtime/index.js';

export default class MethodFinder {
    
    constructor(context, methodCall) {
        this.context = context;
        this.methodCall = methodCall;
   }

   findCandidates(checkInstance) {
        return new Set([...this.findMemberCandidates(checkInstance), ...this.findGlobalCandidates(checkInstance)]);
   }

   findMemberCandidates(checkInstance) {
       const selector = this.methodCall.selector;
       if(selector.parent === null) {
           // if called from a member method, could be a member method called without this/self
           const instance = this.context.getClosestInstanceContext();
           if(instance !== null) {
               const type = instance.instanceType;
               const cd = this.context.getRegisteredDeclaration(type.id);
               if(cd instanceof ConcreteCategoryDeclaration) {
                   const members = cd.getMemberMethods(this.context, selector.id, true);
                   if(members !== null)
                       return new Set([...members.getAll()]);
               }
           }
           return new Set();
       } else {
           const parentType = selector.checkParentType(this.context, checkInstance);
           return parentType !== null ? parentType.getMemberMethods(this.context, selector.id) : new Set();
       }
   }

    findGlobalCandidates(checkInstance) {
        const selector = this.methodCall.selector;
        if(selector.parent !== null)
            return new Set();
        const globals = this.context.getRegisteredDeclaration(selector.id);
        const methods = globals instanceof MethodDeclarationMap ? globals.getAll() : [];
        return new Set([...methods]);
}


    findBest(checkInstance) {
       const allCandidates = new Set();
       let decl = this.findBestReference(checkInstance, allCandidates);
       if (decl !== null)
           return decl;
       decl = this.findBestMethod(checkInstance, allCandidates);
       if (decl !== null)
           return decl;
       if (allCandidates.size === 0)
           this.context.problemListener.reportUnknownMethod(this.methodCall.selector.id, this.methodCall.selector.name);
       else
           this.context.problemListener.reportNoMatchingPrototype(this.methodCall, this.methodCall.toString(), [...allCandidates].map(m => m.getSignature()));
       return null;
   }

    findBestReference(checkInstance, allCandidates) {
        const candidate = this.findCandidateReference(checkInstance);
        if(candidate==null)
            return null;
        allCandidates.add(candidate);
        const compatibles = this.filterCompatible(new Set([candidate]), checkInstance, false);
        return compatibles.size > 0 ? [...compatibles][0] : null;
    }

    findCandidateReference(checkInstance) {
        const selector = this.methodCall.selector;
        if(selector.parent !== null)
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
            const named = this.context.getInstance(selector.id, false);
            if(named === null)
                return null;
            const type = named.getType(this.context);
            if(type instanceof MethodType)
                return type.method.asReference();
        }
        return null;
    }

    getArrowDeclaration(value) {
        return new ArrowDeclaration(value);
    }

    getClosureDeclaration(context, closure) {
        const decl = closure.type.method;
        if(decl.memberOf !== null) {
            // the closure references a member method (useful when a method reference is needed)
            // in which case we may simply want to return that method to avoid spilling context into method body
            // this is only true if the closure comes straight from the method's instance context
            // if the closure comes from an accessible context that is not the instance context
            // then it is a local variable that needs the closure context to be interpreted
            const selector = this.methodCall.selector;
            const declaring = this.context.contextForValue(selector.id);
            if( declaring === closure.context)
                return decl;
        }
        return new ClosureDeclaration(closure);
    }

    findBestMethod(checkInstance, allCandidates) {
        const candidates = this.findCandidates(checkInstance);
        candidates.forEach(c => allCandidates.add(c));
        const compatibles = this.filterCompatible(candidates, checkInstance, false);
        switch (compatibles.size) {
            case 0:
                return null;
            case 1:
                return compatibles.values().next().value;
            default:
                return this.findMostSpecific(compatibles, checkInstance);
        }
    }

    findMostSpecific(candidates, checkInstance) {
        let candidate = null;
        let ambiguous = [];
        candidates.forEach(function(c) {
            if(candidate==null)
                candidate = c;
            else {
                // noinspection JSPotentiallyInvalidUsageOfClassThis
                const score = this.compareSpecifity(candidate, c, checkInstance);
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
        }, this);
        if(ambiguous.length>0) {
            this.context.problemListener.reportTooManyPrototypes(this.methodCall);
        }
        return candidate;
    }

    sortMostSpecificFirst(declarations) {
        const self = this;
        declarations = Array.from(declarations);
        // console.error("sorting:"+ declarations.map(function(decl) { return decl.getProto(); }).join(","));
        declarations.sort((d1, d2) => {
            // console.error( d1.getProto() + "/" + d2.getProto() );
            const score = self.compareSpecifity(d2, d1, false, true);
            // console.error( "-> " + score.name );
            return score.value;
        });
        // console.error("sorted:"+ declarations.map(function(decl) { return decl.getProto(); }).join(","));
        return declarations;
    }

    compareSpecifity(decl1, decl2, checkInstance, allowDerived) {
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
                const arg1 = decl1.parameters.find(as1.name);
                const arg2 = decl2.parameters.find(as2.name);
                if(as1.name===as2.name) {
                    // the general case with named arguments
                    const typ1 = arg1.getType(ctx1);
                    const typ2 = arg2.getType(ctx2);
                    // try resolving runtime type
                    if(checkInstance && typ1 instanceof CategoryType && typ2 instanceof CategoryType) {
                        const value = as1.expression.interpret(this.context); // in the named case as1==as2, so only evaluate 1
                        if(value.getType) {
                            const actual = value.getType();
                            const score = actual.compareSpecifity(this.context, typ1, typ2);
                            if(score!==Score.SIMILAR) {
                                return score;
                            }
                        }
                    }
                    if(typ1.isMoreSpecificThan(ctx2, typ2)) {
                        return Score.BETTER;
                    }
                    if(typ2.isMoreSpecificThan(ctx1, typ1)) {
                        return Score.WORSE;
                    }
                } else {
                    // specific case for single anonymous argument
                    const sp1 = decl1.computeSpecificity(ctx1, arg1, as1, checkInstance, allowDerived);
                    const sp2 = decl2.computeSpecificity(ctx2, arg2, as2, checkInstance, allowDerived);
                    if(sp1.moreSpecificThan(sp2)) {
                        return Score.BETTER;
                    }
                    if(sp2.moreSpecificThan(sp1)) {
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

    filterCompatible(candidates, checkInstance, allowDerived) {
        try {
            this.context.pushProblemListener(new ProblemRaiser());
            return this.doFilterCompatible(candidates, checkInstance, allowDerived);
        } finally {
            this.context.popProblemListener();
        }
    }

    doFilterCompatible(candidates, checkInstance, allowDerived) {
        const compatibles = new Set();
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

    findPotential(checkInstance) {
        const candidates = this.findCandidates(false);
        if(candidates.length === 0)
            this.context.problemListener.reportUnknownMethod(this.methodCall.selector.id, this.methodCall.selector.name);
        return this.filterPotential(candidates);
    }

    filterPotential(candidates) {
        const potential = new Set();
        candidates.forEach(declaration => {
            try {
                const args = this.methodCall.makeArguments(this.context, declaration);
                if(declaration.isAssignableFrom(this.context, args)) {
                    potential.add(declaration);
                }
            } catch(e) {
                if(!(e instanceof SyntaxError)) {
                    throw e;
                }
                // else OK
            }
        }, this);
        return potential;
    }

}

