import {NullValue, BooleanValue} from "./value/index.js"
import AnnotationProcessors from './processor/AnnotationProcessors.js'
import JavaScriptType from "./javascript/JavaScriptType.js"
import $DataStore from "./store/DataStore.js"

export default function initAll() {
    NullValue.init();
    BooleanValue.init();
    $DataStore.init();
    AnnotationProcessors.registerAll();
    JavaScriptType.initializeTypeMap();
}