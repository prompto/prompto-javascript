import ObjectList from "../utils/ObjectList";
import IAssertion from "../expression/IAssertion";
import {Section} from "../parser";
import {Transpiler} from "../runtime";

export default class AssertionList extends ObjectList<IAssertion> {

    constructor(items?: IAssertion[], item?: IAssertion) {
        super(items, item);
    }

    locateSectionAtLine(line: number): Section | null {
        for(let i = 0;i < this.length; i++) {
            const section = this[i].locateSectionAtLine(line);
            if(section)
                return section;
        }
        return null;
    }

    declare(transpiler: Transpiler) {
        this.forEach(a => a.declare(transpiler));
    }
}
