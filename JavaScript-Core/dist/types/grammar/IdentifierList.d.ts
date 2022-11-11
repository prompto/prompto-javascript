import ObjectList from '../utils/ObjectList';
import { Identifier } from "./index";
import { CodeWriter } from "../utils";
export default class IdentifierList extends ObjectList<Identifier> {
    constructor(items?: Identifier[] | null, item?: Identifier | null);
    names(): string[];
    hasAttribute(name: string): boolean;
    toDialect(writer: CodeWriter, finalAnd?: boolean): void;
    toEDialect(writer: CodeWriter, finalAnd: boolean): void;
    toODialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
}
