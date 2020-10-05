import { DictionaryType, TextType } from '../type/index.js'
import { CmdLineParser } from '../utils/index.js'
import { TextValue, DictionaryValue } from '../value/index.js'
import { Identifier, Argument, ArgumentList } from '../grammar/index.js'
import { ValueExpression, MethodSelector } from '../expression/index.js'
import { MethodCall } from '../statement/index.js'
import { UnresolvedParameter } from '../param/index.js'
import { DictLiteral } from '../literal/index.js'
import { SyntaxError } from '../error/index.js'

function parseCmdLineArgs(cmdLineArgs) {
	try {
		const args = CmdLineParser.parse(cmdLineArgs);
		const valueArgs = {};
		Object.keys(args).forEach(s => {
            const key = new TextValue(s);
			const value = new TextValue(args[s]);
			valueArgs[key] = value;
		});
		const dict = new DictionaryValue(TextType.instance, valueArgs, false);
		const argsType = new DictionaryType(TextType.instance);
		return new ValueExpression(argsType, dict);
	} catch(e) {
		// TODO
		return new DictLiteral(false);
	}
}

function buildAssignments(method, cmdLineArgs) {
	const assignments = new ArgumentList();
	if(method.parameters.length==1) {
		const id = method.parameters[0].id;
		const value = parseCmdLineArgs(cmdLineArgs);
		assignments.add(new Argument(new UnresolvedParameter(id), value));
	}
	return assignments;
}


export function locateMethod(context, methodName, cmdLineArgs) {
	const map = context.getRegisteredDeclaration(methodName);
	if(map==null) {
		throw new SyntaxError("Could not find a \"" + methodName + "\" method.");
	}
	return locateMethodInMap(map, cmdLineArgs);
}

function locateMethodInMap(map, cmdLineArgs) {
	if(cmdLineArgs==null || cmdLineArgs.length==0) {
		return locateMethodWithArgs(map);
	} else {
		return locateMethodWithArgs(map, new DictionaryType(TextType.instance));
	}
}

function locateMethodWithArgs(map) {
    const protos = Object.keys(map.protos);
	// try exact match first
    for(let i=0;i<protos.length;i++) {
        var method = map.protos[protos[i]];
        if(identicalArguments(method.parameters, arguments))
            return method;
    }
	// match Text{} argument, will pass null
	if(arguments.length==1) {
        for(let i=0;i<protos.length;i++) {
            method = map.protos[protos[i]];
            if (isSingleTextDictArgument(method.parameters))
                return method;

        }
	}
	// match no argument, will ignore options
    for(let i=0;i<protos.length;i++) {
        method = map.protos[protos[i]];
		if(method.parameters.length==0)
			return method;
	}
	throw new SyntaxError("Could not find a compatible \"" + map.name + "\" method.");
}

function isSingleTextDictArgument(args) {
	if(args.length!=1) {
		return false;
	}
	const arg = args[0];
	const typ = arg.type ||null;
	if(typ==null) {
		return false;
	}
	const argsType = new DictionaryType(TextType.instance);
	return typ.equals(argsType);
}

function identicalArguments(args, argTypes) {
	if(args.length!=argTypes.length-1) {
		return false;
	}
	for(let i=0;i<args.length;i++) {
		const typ = args[i].typ || null;
		if(typ==null) {
			return false;
		}
		if(!typ.equals(argTypes[i+1])) {
			return false;
		}
	}
	return true;
}

export default class Interpreter {

    static interpret(context, methodName, cmdLineArgs) {
        try {
            const method = locateMethod(context, methodName, cmdLineArgs);
            const assignments = buildAssignments(method, cmdLineArgs);
            const call = new MethodCall(new MethodSelector(null, new Identifier(methodName)),assignments);
            call.interpret(context);
        } finally {
            context.terminated();
        }
    }

    static interpretTests(context) {
        for(const name in context.tests) {
            const test = context.tests[name];
            const local = context.newLocalContext();
            test.interpret(local);
        }
    }

    static interpretTest(context, name) {
        const test = context.getRegisteredTest(name);
        const local = context.newLocalContext();
        test.interpret(local);
    }

    static executeTest(context, name) {
        const test = context.getRegisteredTest(name);
        const local = context.newLocalContext();
        test.interpret(local);
    }
}



