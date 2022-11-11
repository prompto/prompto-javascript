import { TypeFamily } from "./index";
export default class AttributeInfo {
    name: string;
    family: TypeFamily;
    isCollection: boolean;
    keyIndex: boolean;
    valueIndex: boolean;
    wordsIndex: boolean;
    constructor(name: string, family: TypeFamily, isCollection: boolean, indexTypes?: string[] | null);
    toTranspiled(): string;
}
