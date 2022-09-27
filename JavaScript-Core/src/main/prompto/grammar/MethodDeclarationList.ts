import ObjectList from '../utils/ObjectList'
import {IMethodDeclaration} from "../declaration";

export default class MethodDeclarationList extends ObjectList<IMethodDeclaration> {

    constructor(methods: IMethodDeclaration[], method: IMethodDeclaration) {
        super(methods, method);
    }
}
