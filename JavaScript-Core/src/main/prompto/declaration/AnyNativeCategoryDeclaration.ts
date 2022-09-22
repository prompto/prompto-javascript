import NativeCategoryDeclaration from './NativeCategoryDeclaration'
import {Identifier, IdentifierList, NativeCategoryBindingList} from '../grammar'

export default class AnyNativeCategoryDeclaration extends NativeCategoryDeclaration {

    static instance = new AnyNativeCategoryDeclaration();

    constructor() {
        super(new Identifier("Any"), new IdentifierList(), new NativeCategoryBindingList(), [], []);
    }
}

