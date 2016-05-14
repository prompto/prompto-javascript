var DictType = require("../type/DictType").DictType;
var TextType = require("../type/TextType").TextType;
var ArgumentAssignment = require("../grammar/ArgumentAssignment").ArgumentAssignment;
var ArgumentAssignmentList = require("../grammar/ArgumentAssignmentList").ArgumentAssignmentList;
var UnresolvedArgument = require("../argument/UnresolvedArgument").UnresolvedArgument;
var Identifier = require("../grammar/Identifier").Identifier;
var DictLiteral = require("../literal/DictLiteral").DictLiteral;
var MethodCall = require("../statement/MethodCall").MethodCall;
var MethodSelector = require("../expression/MethodSelector").MethodSelector;
var CmdLineParser = require("../utils/CmdLineParser").CmdLineParser;
var Dictionary = require("../value/Dictionary").Dictionary;
var ExpressionValue = require("../value/ExpressionValue").ExpressionValue;

var argsType = new DictType(TextType.instance);

function parseCmdLineArgs(cmdLineArgs) {
	try {
		var args = CmdLineParser.parse(cmdLineArgs);
		var valueArgs = {};
		Object.keys(args).forEach(function(s) {
            var key = new Text(s);
			var value = new Text(args[s]);
			valueArgs[key] = value;
		});
		var dict = new Dictionary(TextType.instance, valueArgs, false);
		return new ExpressionValue(argsType, dict);
	} catch(e) {
		// TODO
		return new DictLiteral(false);
	}
}

function buildAssignments(method, cmdLineArgs) {
	var assignments = new ArgumentAssignmentList();
	if(method.args.length==1) {
		var id = method.args[0].id;
		var value = parseCmdLineArgs(cmdLineArgs);
		assignments.add(new ArgumentAssignment(new UnresolvedArgument(id), value));
	}
	return assignments;
}


function locateMethod(context, methodName, cmdLineArgs) {
	var map = context.getRegisteredDeclaration(methodName);
	if(map==null) {
		throw new SyntaxError("Could not find a \"" + methodName + "\" method.");
	}
	return locateMethodInMap(map, cmdLineArgs);
}

function locateMethodInMap(map, cmdLineArgs) {
	if(cmdLineArgs==null || cmdLineArgs.length==0) {
		return locateMethodWithArgs(map);
	} else {
		return locateMethodWithArgs(map, new DictType(TextType.instance));
	}
}

function locateMethodWithArgs(map) {
    var protos = Object.keys(map.protos);
	// try exact match first
    for(var i=0;i<protos.length;i++) {
        var method = map.protos[protos[i]];
        if(identicalArguments(method.args, arguments))
            return method;
    };
	// match Text{} argument, will pass null
	if(arguments.length==1) {
        for(var i=0;i<protos.length;i++) {
            var method = map.protos[protos[i]];
            if (isSingleTextDictArgument(method.args))
                return method;

        };
	}
	// match no argument, will ignore options
    for(var i=0;i<protos.length;i++) {
        var method = map.protos[protos[i]];
		if(method.args.length==0)
			return method;
	};
	throw new SyntaxError("Could not find a compatible \"" + map.name + "\" method.");
}

function isSingleTextDictArgument(args) {
	if(args.length!=1) {
		return false;
	}
	var arg = args[0];
	var typ = arg.type ||null
	if(typ==null) {
		return false;
	}
	return typ.equals(argsType);
}

function identicalArguments(args, argTypes) {
	if(args.length!=argTypes.length-1) {
		return false;
	}
	for(var i=0;i<args.length;i++) {
		var typ = args[i].typ || null;
		if(typ==null) {
			return false;
		}
		if(!typ.equals(argTypes[i+1])) {
			return false;
		}
	}
	return true;
}

function Interpreter() {
}

Interpreter.interpret = function(context, methodName, cmdLineArgs) {
	try {
		var method = locateMethod(context, methodName, cmdLineArgs);
		var assignments = buildAssignments(method, cmdLineArgs);
		var call = new MethodCall(new MethodSelector(null, new Identifier(methodName)),assignments);
		call.interpret(context);
	} finally {
		context.terminated();
	}
};


Interpreter.interpretTests = function(context) {
    for(var name in context.tests) {
        var test = context.tests[name];
        var local = context.newLocalContext();
        test.interpret(local);
    }
};

Interpreter.interpretTest = function(context, name) {
    var test = context.getRegisteredTest(name);
    var local = context.newLocalContext();
    test.interpret(local);
};

exports.Interpreter = Interpreter;


