var PromptoError = require("../error/PromptoError").PromptoError;
var CategoryType = null;
var Score = require("./Score").Score;

exports.resolve = function() {
	CategoryType = require("../type/CategoryType").CategoryType;
}

function MethodFinder(context, methodCall) {
	this.context = context;
	this.methodCall = methodCall;
	return this;
}

MethodFinder.prototype.findCompatibleMethods = function(checkInstance, allowDerived) {
    var candidates = this.methodCall.selector.getCandidates(this.context, checkInstance);
    if(candidates.size==0)
        this.context.problemListener.reportUnknownMethod(this.methodCall.selector.id);
    return this.filterCompatible(candidates, checkInstance, allowDerived);
};

MethodFinder.prototype.findMethod = function(checkInstance) {
	var compatibles = this.findCompatibleMethods(checkInstance, false);
	switch(compatibles.size) {
	case 0:
		this.context.problemListener.reportNoMatchingPrototype(this.methodCall);
		return null;
	case 1:
		return compatibles.values().next().value;
	default:
		return this.findMostSpecific(compatibles, checkInstance);
	}
};

MethodFinder.prototype.findMostSpecific = function(candidates, checkInstance) {
	var candidate = null;
	var ambiguous = [];
	candidates.forEach(function(c) {
		if(candidate==null)
			candidate = c;
		else {
			var score = this.scoreMostSpecific(candidate, c, checkInstance);
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
		throw new SyntaxError("Too many prototypes!"); // TODO refine
	}
	return candidate;
}

MethodFinder.prototype.sortMostSpecificFirst = function(declarations) {
    var self = this;
    declarations = Array.from(declarations);
    // console.error("sorting:"+ declarations.map(function(decl) { return decl.getProto(); }).join(","));
    declarations.sort(function(d1, d2) {
        // console.error( d1.getProto() + "/" + d2.getProto() );
        var score = self.scoreMostSpecific(d2, d1, false, true);
        // console.error( "-> " + score.name );
        return score.value;
    });
    // console.error("sorted:"+ declarations.map(function(decl) { return decl.getProto(); }).join(","));
    return declarations;
};

MethodFinder.prototype.scoreMostSpecific = function(decl1, decl2, checkInstance, allowDerived) {
	try {
        var ctx1 = this.context.newLocalContext();
		decl1.registerArguments(ctx1);
		var ctx2 = this.context.newLocalContext();
		decl2.registerArguments(ctx2);
		var ass1 = this.methodCall.makeArguments(this.context, decl1);
		var ass2 = this.methodCall.makeArguments(this.context, decl2);
		for(var i=0;i<ass1.length && i<ass2.length;i++) {
			var as1 = ass1[i];
			var as2 = ass2[i];
			var arg1 = decl1.args.find(as1.name);
			var arg2 = decl2.args.find(as2.name);
			if(as1.name===as2.name) {
				// the general case with named arguments
				var typ1 = arg1.getType(ctx1);
				var typ2 = arg2.getType(ctx2);
				// try resolving runtime type
				if(checkInstance && typ1 instanceof CategoryType && typ2 instanceof CategoryType) {
					var value = as1.expression.interpret(this.context); // in the named case as1==as2, so only evaluate 1
					if(value.getType) {
						var actual = value.getType();
						var score = actual.scoreMostSpecific(this.context, typ1, typ2);
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
				var sp1 = as1.computeSpecificity(ctx1, arg1, decl1, checkInstance, allowDerived);
				var sp2 = as2.computeSpecificity(ctx2, arg2, decl2, checkInstance, allowDerived);
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

MethodFinder.prototype.filterCompatible = function(candidates, checkInstance, allowDerived) {
	var compatibles = new Set();
	candidates.forEach(function(declaration) {
        try {
			var assignments = this.methodCall.makeArguments(this.context, declaration);
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
};


exports.MethodFinder = MethodFinder;