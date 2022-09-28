import {JsxProperty} from "../jsx";
import ICategoryDeclaration from "./ICategoryDeclaration";

export default interface IWidgetDeclaration extends ICategoryDeclaration {
    properties: JsxProperty | null;
}
