
export default class AnyNativeCategoryDeclaration extends NativeCategoryDeclaration {

    constructor() {
        super(new Identifier("Any"), [], [], [], []);
    }
}

AnyNativeCategoryDeclaration.instance = new AnyNativeCategoryDeclaration();
