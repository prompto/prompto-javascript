
export default class JsxType extends NativeType {

    constructor() {
        super(new Identifier("Jsx"));
    }
}


JsxType.instance = new JsxType();
