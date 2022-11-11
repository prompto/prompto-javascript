import { CodeWriter } from "../utils";
export default interface INativeCategoryBinding {
    toDialect(writer: CodeWriter): void;
}
