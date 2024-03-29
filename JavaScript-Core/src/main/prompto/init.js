import {NullValue, BooleanValue} from "./value/index.js"
import AnnotationProcessors from './processor/AnnotationProcessors.js'
import JavaScriptClassType from "./javascript/JavaScriptClassType.js"
import $DataStore from "./store/DataStore.js"

export default function initAll() {
    NullValue.init();
    BooleanValue.init();
    $DataStore.init();
    JavaScriptClassType.init();
    AnnotationProcessors.init();
}