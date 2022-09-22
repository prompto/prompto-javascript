import ObjectList from "../../../main/prompto/utils/ObjectList.ts";

export default class IfElementList extends ObjectList {

    constructor(item) {
        super();
        item = item || null;
        if (item != null) {
            this.add(item);
        }
    }
}

