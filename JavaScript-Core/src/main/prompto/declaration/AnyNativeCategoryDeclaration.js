import NativeCategoryDeclaration from "./NativeCategoryDeclaration"
import { Identifier } from "../grammar/index"

export default class AnyNativeCategoryDeclaration extends NativeCategoryDeclaration {

    constructor() {
        super(new Identifier("Any"), [], [], [], []);
    }
}

AnyNativeCategoryDeclaration.instance = new AnyNativeCategoryDeclaration();
