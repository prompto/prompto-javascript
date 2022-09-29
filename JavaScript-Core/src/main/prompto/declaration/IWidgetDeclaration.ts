import ICategoryDeclaration from "./ICategoryDeclaration";
import {PropertyMap} from "../property";

export default interface IWidgetDeclaration extends ICategoryDeclaration {
    properties: PropertyMap | null;
}
