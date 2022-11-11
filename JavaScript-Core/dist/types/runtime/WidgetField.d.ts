import Variable from './Variable';
import { IType } from "../type";
import { Identifier } from "../grammar";
export default class WidgetField extends Variable {
    createdBy: any;
    updatedBy?: any;
    constructor(id: Identifier, type: IType, createdBy: any);
}
