import BaseValue from './BaseValue';
import { IType } from "../type";
import Binary from "../intrinsic/Binary";
export default class BinaryValue extends BaseValue<Binary> {
    constructor(itype: IType, mimeType: string, data: ArrayBuffer);
}
