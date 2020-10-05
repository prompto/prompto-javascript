import ObjectList from "../utils/ObjectList.js";

export default class IfElementList extends ObjectList {

    constructor(item) {
        super();
        item = item || null;
        if (item != null) {
            this.add(item);
        }
    }
}

