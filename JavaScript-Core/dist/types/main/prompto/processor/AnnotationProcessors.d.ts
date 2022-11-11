import { Identifier } from "../grammar";
import AnnotationProcessor from "./AnnotationProcessor";
declare function forId(id: Identifier): AnnotationProcessor | null;
declare function forName(name: string): AnnotationProcessor | null;
declare function register(processor: AnnotationProcessor): void;
declare function names(): string[];
declare function init(): void;
declare const _default: {
    forId: typeof forId;
    forName: typeof forName;
    register: typeof register;
    init: typeof init;
    names: typeof names;
};
export default _default;
