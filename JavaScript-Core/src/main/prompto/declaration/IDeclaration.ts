import {CodeWriter, IWritable} from "../utils";
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
  check(context: Context): void;
  declare(transpiler: Transpiler): void;
  transpile(transpiler: Transpiler): void;
  toDialect(writer: CodeWriter): void;
  unregister(context: Context): void;

}
