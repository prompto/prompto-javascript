import ObjectList from '../utils/ObjectList'
import SwitchCase from "./SwitchCase";


export default class SwitchCaseList extends ObjectList<SwitchCase> {

    constructor(items?: SwitchCase[], item?: SwitchCase) {
        super(items, item);
    }

    locateSectionAtLine(line: number, checkExpression?: boolean) {
        for (let i = 0; i < this.length; i++) {
            const section = this[i].locateSectionAtLine(line, checkExpression);
            if (section)
                return section;
        }
        return null;
    }
}
