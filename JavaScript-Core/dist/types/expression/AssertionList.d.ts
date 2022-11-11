import ObjectList from "../utils/ObjectList";
import IAssertion from "../expression/IAssertion";
import { Section } from "../parser";
import { Transpiler } from "../runtime";
export default class AssertionList extends ObjectList<IAssertion> {
    constructor(items?: IAssertion[], item?: IAssertion);
    locateSectionAtLine(line: number): Section | null;
    declare(transpiler: Transpiler): void;
}
