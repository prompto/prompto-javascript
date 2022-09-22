import ObjectList from '../utils/ObjectList.ts'

export default class SwitchCaseList extends ObjectList {

    constructor(item) {
        super();
        item = item || null;
        if (item != null) {
            this.add(item);
        }
    }

    locateSectionAtLine(line, checkExpression) {
        for (let i = 0; i < this.length; i++) {
            const section = this[i].locateSectionAtLine(line, checkExpression);
            if (section)
                return section;
        }
        return null;
    }
}
