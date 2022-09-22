import { Writable } from "../utils";
import { DeclarationInfo } from "../runtime/Catalog";
import Named from "../grammar/Named";
import {Context, Transpiler} from "../runtime";
import {CommentStatement} from "../statement";
import {Annotation} from "../grammar";

export default interface Declaration extends Writable, Named {

  comments: CommentStatement[] | null;
  annotations: Annotation[] | null;

  getDeclarationType(): string;
  toDeclarationInfo(context: Context): DeclarationInfo;
  declare(transpiler: Transpiler): void;
  transpile(transpiler: Transpiler): void;

}
