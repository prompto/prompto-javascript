import { IWritable } from "../utils";
import { IDeclarationInfo } from "../runtime/Catalog";
import INamed from "../grammar/INamed";
import {Context, Transpiler} from "../runtime";
import {CommentStatement} from "../statement";
import {Annotation} from "../grammar";

export default interface IDeclaration extends IWritable, INamed {

  comments: CommentStatement[] | null;
  annotations: Annotation[] | null;

  getDeclarationType(): string;
  toDeclarationInfo(context: Context): IDeclarationInfo;
  declare(transpiler: Transpiler): void;
  transpile(transpiler: Transpiler): void;

}
