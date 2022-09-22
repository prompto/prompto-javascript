import {Named} from "../grammar";

export default interface Parameter extends Named {
    equals(incoming: Parameter): boolean;
}
