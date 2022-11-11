import { IDeclaration } from "./index";
import { Annotation } from "../grammar";
import { Context } from "../runtime";
export default interface ICategoryDeclaration extends IDeclaration {
    getAllAnnotations(context: Context): Annotation[] | null;
}
