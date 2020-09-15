import Value from './Value.js'
import { ListValue } from './index.js'
import { AnyType } from '../type/index.js'

export default class Container extends Value {

    constructor(type) {
        super(type);
    }

    toDocumentValue(context) {
        const items = this.items.map(item => {
            item.toDocumentValue(context);
        });
        return new ListValue(AnyType.instance, items);
    }
}