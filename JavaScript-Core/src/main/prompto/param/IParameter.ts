import {INamed} from "../grammar";

export default interface IParameter extends INamed {
    equals(incoming: IParameter): boolean;
}
