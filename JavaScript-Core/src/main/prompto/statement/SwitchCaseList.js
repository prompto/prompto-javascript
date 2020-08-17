
export default class SwitchCaseList extends ObjectList {
    constructor(item) {
        super();
        item = item || null;
        if (item != null) {
            this.add(item);
        }
        return this;
    }

    locateSectionAtLine(line) {
        for (let i = 0; i < this.length; i++) {
            const switchCase = this[i];
            const section = switchCase.locateSectionAtLine(line);
            if (section)
                return section;
        }
        return null;
    }
}