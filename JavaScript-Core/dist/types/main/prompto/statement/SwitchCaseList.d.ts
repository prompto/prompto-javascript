import ObjectList from '../utils/ObjectList';
import SwitchCase from "./SwitchCase";
export default class SwitchCaseList extends ObjectList<SwitchCase> {
    constructor(items?: SwitchCase[], item?: SwitchCase);
    locateSectionAtLine(line: number, checkExpression?: boolean): import("../parser").Section;
}
