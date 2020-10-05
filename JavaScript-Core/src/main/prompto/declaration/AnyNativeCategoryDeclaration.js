import NativeCategoryDeclaration from './NativeCategoryDeclaration.js'
import { Identifier } from '../grammar/index.js'

export default class AnyNativeCategoryDeclaration extends NativeCategoryDeclaration {

    constructor() {
        super(new Identifier("Any"), [], [], [], []);
    }
}

AnyNativeCategoryDeclaration.instance = new AnyNativeCategoryDeclaration();
