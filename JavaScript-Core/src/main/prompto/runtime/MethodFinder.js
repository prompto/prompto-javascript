const PromptoError = require("../error/PromptoError").PromptoError;
let CategoryType = null;
const Score = require("./Score").Score;

exports.resolve = () => {
	CategoryType = require("../type/CategoryType").CategoryType;
}

class MethodFinder {
    
    constructor(context, methodCall) {
        this.context = context;
        this.methodCall = methodCall;
   }

    findCompatibleMethods(checkInstance, allowDerived) {
        const candidates = this.methodCall.selector.getCandidates(this.context, checkInstance);
        if(candidates.size==0)
            this.context.problemListener.reportUnknownMethod(this.methodCall.selector.id);
        return this.filterCompatible(candidates, checkInstance, allowDerived);
    }

    findMethod(checkInstance) {
        const compatibles = this.findCompatibleMethods(checkInstance, false);
        switch(compatibles.size) {
        case 0:
            this.context.problemListener.reportNoMatchingPrototype(this.methodCall);
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
                const score = this.scoreMostSpecific(candidate, c, checkInstance);
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
            const score = self.scoreMostSpecific(d2, d1, false, true);
            // console.error( "-> " + score.name );
            return score.value;
        });
        // console.error("sorted:"+ declarations.map(function(decl) { return decl.getProto(); }).join(","));
        return declarations;
    }

    scoreMostSpecific(decl1, decl2, checkInstance, allowDerived) {
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
                            const score = actual.scoreMostSpecific(this.context, typ1, typ2);
                            if(score!==Score.SIMILAR) {
                                return score;
                            }
                        }
                    }
                    if(typ1.isMoreSpecificThan(ctx2, typ2)) {
                        // console.error(typ1.name + " is more specific than " + typ2.name);
                        return Score.BETTER;
                    }
                    if(typ2.isMoreSpecificThan(ctx1, typ1)) {
                        // console.error(typ2.name + " is more specific than " + typ1.name);
                        return Score.WORSE;
                    }
                } else {
                    // specific case for single anonymous argument
                    const sp1 = as1.computeSpecificity(ctx1, arg1, decl1, checkInstance, allowDerived);
                    const sp2 = as2.computeSpecificity(ctx2, arg2, decl2, checkInstance, allowDerived);
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
        const compatibles = new Set();
        candidates.forEach(function(declaration) {
            try {
                const assignments = this.methodCall.makeArguments(this.context, declaration);
                if(declaration.isAssignableTo(this.context, assignments, checkInstance, allowDerived)) {
                    compatibles.add(declaration);
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
}


exports.MethodFinder = MethodFinder;