import { Score, Context } from './index';
import { ClosureValue, ArrowValue } from '../value';
import { ClosureDeclaration, ArrowDeclaration, IMethodDeclaration } from '../declaration';
import { MethodCall } from "../statement";
export default class MethodFinder {
    context: Context;
    methodCall: MethodCall;
    constructor(context: Context, methodCall: MethodCall);
    findCandidates(checkInstance: boolean): Set<IMethodDeclaration>;
    findMemberCandidates(checkInstance: boolean): Set<IMethodDeclaration>;
    findGlobalCandidates(): Set<IMethodDeclaration>;
    findBest(checkInstance: boolean): IMethodDeclaration | null;
    findBestReference(candidates: Set<IMethodDeclaration>, checkInstance: boolean): IMethodDeclaration | null;
    findCandidateReference(checkInstance: boolean): IMethodDeclaration | null;
    getArrowDeclaration(value: ArrowValue): ArrowDeclaration;
    getClosureDeclaration(context: Context, closure: ClosureValue): IMethodDeclaration | ClosureDeclaration;
    findBestMethod(allCandidates: Set<IMethodDeclaration>, checkInstance: boolean): IMethodDeclaration;
    findMostSpecific(candidates: Set<IMethodDeclaration>, checkInstance: boolean): IMethodDeclaration | null;
    sortMostSpecificFirst(declarations: Set<IMethodDeclaration>): IMethodDeclaration[];
    compareSpecifity(decl1: IMethodDeclaration, decl2: IMethodDeclaration, checkInstance: boolean, allowDerived: boolean): Score;
    filterCompatible(candidates: Set<IMethodDeclaration>, checkInstance: boolean, allowDerived: boolean): Set<IMethodDeclaration>;
    doFilterCompatible(candidates: Set<IMethodDeclaration>, checkInstance: boolean, allowDerived: boolean): Set<IMethodDeclaration>;
    findPotential(checkInstance?: boolean): Set<IMethodDeclaration>;
    filterPotential(candidates: Set<IMethodDeclaration>): Set<IMethodDeclaration>;
}
