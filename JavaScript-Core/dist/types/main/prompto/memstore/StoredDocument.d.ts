import { IStored } from "../store";
import MemPredicate from "./MemPredicate";
export default class StoredDocument extends Map<string, any> implements IStored {
    category: string[];
    constructor(categories: string[]);
    get dbId(): any;
    hasData(name: string): boolean;
    getData(name: string): any;
    matches(predicate: MemPredicate): boolean;
    project(projection: string[]): StoredDocument;
}
