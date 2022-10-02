import {DictionaryType, IType, TextType} from '../type'
import { CmdLineParser } from '../utils'
import {TextValue, DictionaryValue, IValue} from '../value'
import { Identifier, Argument, ArgumentList } from '../grammar'
import { ValueExpression, MethodSelector } from '../expression'
import { MethodCall } from '../statement'
import {ParameterList, UnresolvedParameter} from '../param'
import { DictLiteral } from '../literal'
import { SyntaxError } from '../error'
import {Context} from "./Context";
import {MethodDeclarationMap} from "./index";
import {IMethodDeclaration} from "../declaration";
import {Dictionary} from "../intrinsic";

function parseCmdLineArgs(cmdLineArgs: string | null) {
	try {
		const args = CmdLineParser.parse(cmdLineArgs);
		const valueArgs = new Dictionary<TextValue, IValue>();
		args.forEach((v,k) => valueArgs.set(new TextValue(k), new TextValue(v)));
		const dict = new DictionaryValue(TextType.instance, false, valueArgs);
		const argsType = new DictionaryType(TextType.instance);
		return new ValueExpression(argsType, dict);
	} catch(e) {
		// TODO
		return new DictLiteral(false, null);
	}
}

function buildAssignments(method: IMethodDeclaration, cmdLineArgs: string | null) {
	const assignments = new ArgumentList();
	if(method.parameters && method.parameters.length == 1) {
		const id = method.parameters[0].id;
		const value = parseCmdLineArgs(cmdLineArgs);
		assignments.add(new Argument(new UnresolvedParameter(id), value));
	}
	return assignments;
}


export function locateMethod(context: Context, methodName: string, cmdLineArgs: string | null) {
	const map = context.getRegistered(new Identifier(methodName));
	if(map instanceof MethodDeclarationMap)
		return locateMethodInMap(map, cmdLineArgs);
	else
		throw new SyntaxError("Could not find a \"" + methodName + "\" method.");
}

function locateMethodInMap(map: MethodDeclarationMap, cmdLineArgs: string | null) {
	if(!cmdLineArgs || cmdLineArgs.length == 0) {
		return locateMethodWithArgs(map);
	} else {
		return locateMethodWithArgs(map, new DictionaryType(TextType.instance));
	}
}

function locateMethodWithArgs(map: MethodDeclarationMap, ... args: IType[]) {
    // try exact match first
	let method = Array.from(map.protos.values()).filter(method => identicalArguments(method.parameters!, args))[0] || null;
	// match Text{} argument, will pass null
	if(!method && args.length == 1)
		method = Array.from(map.protos.values()).filter(method => isSingleTextDictArgument(method.parameters!))[0] || null;
	// match no argument, will ignore options
	if(!method)
		method = Array.from(map.protos.values()).filter(method => method.parameters?.length == 0)[0] || null;
	if(method)
		return method;
	else
		throw new SyntaxError("Could not find a compatible \"" + map.name + "\" method.");
}

function isSingleTextDictArgument(args: ParameterList) {
	if(args.length != 1) {
		return false;
	}
	const arg = args[0];
	const type = arg.getType() || null;
	return type ? type.equals(new DictionaryType(TextType.instance)) : false;
}

function identicalArguments(args: ParameterList, argTypes: IType[]) {
	if(args.length != argTypes.length) {
		return false;
	}
	for(let i=0;i<args.length;i++) {
		const type = args[i].getType() || null;
		if(!type || !type.equals(argTypes[i]))
			return false;
	}
	return true;
}

export default class Interpreter {

    static interpret(context: Context, methodName: string, cmdLineArgs: string | null) {
        try {
            const method = locateMethod(context, methodName, cmdLineArgs);
            const assignments = buildAssignments(method, cmdLineArgs);
            const call = new MethodCall(new MethodSelector(null, new Identifier(methodName)),assignments);
            call.interpret(context);
        } finally {
            context.terminated();
        }
    }

    static interpretTests(context: Context) {
        for(const test of context.tests.values()) {
            const local = context.newLocalContext();
            test.interpret(local);
        }
    }

    static interpretTest(context: Context, name: string) {
        const test = context.getRegisteredTest(name);
        const local = context.newLocalContext();
        test!.interpret(local);
    }

    static executeTest(context: Context, name: string) {
        const test = context.getRegisteredTest(name);
        const local = context.newLocalContext();
        test!.interpret(local); // no execution yet
    }
}



