import { BooleanValue } from "./value";
import { JavaScriptClassType } from "./javascript";
import { AnnotationProcessors } from "./processor";
export default function initAll() {
    BooleanValue.init();
    JavaScriptClassType.init();
    AnnotationProcessors.init();
}
