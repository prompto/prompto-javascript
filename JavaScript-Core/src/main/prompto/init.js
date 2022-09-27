import {NullValue, BooleanValue} from "../../main/prompto/value"
import AnnotationProcessors from '../../main/prompto/processor/AnnotationProcessors.ts'
import JavaScriptClassType from "./javascript/JavaScriptClassType.js"
import $DataStore from "../../main/prompto/store/DataStore.ts"

export default function initAll() {
    NullValue.init();
    BooleanValue.init();
    $DataStore.init();
    JavaScriptClassType.init();
    AnnotationProcessors.init();
}
