import ProblemType from "./ProblemType";

export default interface Problem {
    type: ProblemType;
    message: string;
    path :string;
    startLine: number;
    startColumn: number;
    endLine: number;
    endColumn: number;
}

