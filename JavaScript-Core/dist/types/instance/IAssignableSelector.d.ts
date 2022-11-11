import IAssignableInstance from "./IAssignableInstance";
export default interface IAssignableSelector extends IAssignableInstance {
    parent: IAssignableInstance | null;
}
