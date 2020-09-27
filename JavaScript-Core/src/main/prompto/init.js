import {NullValue, BooleanValue} from "./value/index.js"
import ContOp from "./grammar/ContOp.js"
import AnnotationProcessors from './processor/AnnotationProcessors.js'

export default function initAll() {
    ContOp.init();
    NullValue.init();
    BooleanValue.init();
    AnnotationProcessors.registerAll();
}