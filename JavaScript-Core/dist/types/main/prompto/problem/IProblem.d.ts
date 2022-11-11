import ProblemType from "./ProblemType";
export default interface IProblem {
    type: ProblemType;
    message: string;
    path: string;
    startLine: number;
    startColumn: number;
    endLine: number;
    endColumn: number;
}
