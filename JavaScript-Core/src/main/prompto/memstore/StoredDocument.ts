/* eslint-disable @typescript-eslint/no-unsafe-return */
import {IStored} from "../store";
import MemPredicate from "./MemPredicate";

export default class StoredDocument extends Map<string, any> implements IStored {

    category: string[];

    constructor(categories: string[]) {
        super();
        // use reserved 'category' keyword explicitly
        this.category = categories;
    }

    get dbId(): any {
        return this.getData("dbId");
    }

    hasData(name: string) {
        return name in this;
    }

    getData(name: string) {
        return this.get(name) || null;
    }

    matches(predicate: MemPredicate) {
        return predicate.matches(this);
    }

    project(projection: string[]) {
        const doc = new StoredDocument(this.category);
        projection.forEach(name => doc.set(name, this.getData(name)), this);
        return doc;
    }
}
