import {TypeFamily} from "./index";

export default class AttributeInfo {

    name: string;
    family: TypeFamily;
    isCollection: boolean;
    keyIndex: boolean;
    valueIndex: boolean;
    wordsIndex: boolean;

    constructor(name: string, family: TypeFamily, isCollection: boolean, indexTypes?: string[] | null) {
        this.name = name
        this.family = family
        this.isCollection = isCollection
        this.keyIndex = indexTypes ? indexTypes.indexOf("key") >= 0 : false;
        this.valueIndex = indexTypes ? indexTypes.indexOf("value") >= 0 : false;
        this.wordsIndex = indexTypes ? indexTypes.indexOf("words") >= 0 : false;
    }

    toTranspiled() {
        return "new AttributeInfo('" + this.name + "', TypeFamily." + this.family.name + ", " + (this.isCollection ? "true" : "false") + ", null)";
    }
}
