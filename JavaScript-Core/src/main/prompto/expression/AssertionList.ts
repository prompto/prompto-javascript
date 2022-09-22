import ObjectList from "../utils/ObjectList";
import Assertion from "./Assertion";
import {Section} from "../parser";
import {Transpiler} from "../runtime";

export default class AssertionList extends ObjectList<Assertion> {

    constructor(items?: Assertion[], item?: Assertion) {
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
