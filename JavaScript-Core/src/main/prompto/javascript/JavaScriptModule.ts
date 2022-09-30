/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */
import { SyntaxError } from '../error'
import { importPathIfNode } from '../utils/ImportUtils'
import {Transpiler} from "../runtime";
import {CodeWriter} from "../utils";

export default class JavaScriptModule {

    ids: string[];

    constructor(ids: string[]) {
        this.ids = ids;
    }

    toString(): string {
        let res = this.ids.join("/");
        if("js"==this.ids[this.ids.length-1]) {
            res = res.replace("/js", ".js")
        }
        return res;
    }

    resolve(): object | null {
        return this.resolve_webpack()
            || this.resolve_module()
            || this.resolve_runtime()
            || this.resolve_path("prompto")
            || this.resolve_path("main")
            || this.resolve_path("main", "test");
    }

    resolve_webpack(): object | null {
        try {
            // get a copy of the path identifiers
            const ids: string[] = this.ids.concat([]);
            // drop the 'js' extension
            if(ids[ids.length-1]=="js")
                ids.pop();
            // last id is the function, forget it
            ids.pop();
            // eval root module
            let m: object | null = (eval(ids.shift() as string) as object) || null;
            // drill down
            ids.forEach(id => {
                m = m ? m[id as keyof typeof m] || null : null;
            });
            return m || null;
        } catch (e) {
            return null;
        }
    }

    resolve_module(): object | null {
        try {
            const rootPath = this.toString();
            return (eval("require('" + rootPath + "')") as object) || null;
        } catch (e) {
            return null;
        }
    }

    resolve_runtime(): object | null {
        try {
            const path = importPathIfNode();
            const folder = path!.sep + "JavaScript-Core" + path!.sep;
            const idx = module.filename.lastIndexOf(folder);
            const rootPath = module.filename.substring(0, idx + 1) + "JavaScript-Runtime" + path!.sep + "src" + path!.sep + "main" + path!.sep;
            // for now let's assume prompto and the required module are at the same level
            const modulePath = rootPath + this.toString();
            return (eval("require('" + modulePath + "')") as object) || null;
        } catch (e) {
            return null;
        }
    }

    resolve_path(part: string, replace?: string): object | null {
        try {
            const path = importPathIfNode();
            const folder = path!.sep + part + path!.sep;
            const idx = module.filename.lastIndexOf(folder);
            let rootPath = module.filename.substring(0, idx + 1);
            if(replace)
                rootPath = rootPath + replace + "/";
            const modulePath = rootPath + this.toString();
            return (eval("require('" + modulePath + "')") as object) || null;
        } catch (e) {
            return null;
        }
    }

    transpileWidget(transpiler: Transpiler): void {
        const ids = this.ids;
        if("js"==ids[ids.length-1])
            ids.pop();
        transpiler.append(ids.join("."));
    }

    transpile(transpiler: Transpiler, name: string) {
        if(this.transpile_intrinsic(transpiler, name))
            return;
        else if(this.transpile_webpack(transpiler, name))
            return;
        else if(this.transpile_module(transpiler, name))
            return;
        else if(this.transpile_runtime(transpiler, name))
            return;
        else if(this.transpile_path(transpiler, name, "prompto"))
            return;
        else if(this.transpile_path(transpiler, name, "main"))
            return;
        else if(this.transpile_path(transpiler, name, "main", "test"))
            return;
        else
            throw new SyntaxError("Cannot locate module: " + this.toString());
    }

    transpile_intrinsic(transpiler: Transpiler, name: string) {
        return this.ids[0]=="prompto" && this.ids[1]=="intrinsic";
    }

    transpile_webpack(transpiler: Transpiler, name: string) {
        try {
            // get a copy of the path identifiers
            const ids = this.ids.concat([]);
            // drop the 'js' extension
            if(ids[ids.length-1]=="js")
                ids.pop();
            // last id is the function, forget it
            ids.pop();
            // eval root module
            let m = eval(ids.shift()!);
            // drill down
            ids.forEach(id => {
                if(m)
                    m = m[id as keyof typeof m];
            });
            if(!m)
                return false;
            else {
                transpiler.append("var ").append(name).append(" = ").append(ids.join('.')).append(".").append(name).append(";").newLine();
                return true;
            }
        } catch (e) {
            return false;
        }
    }

    transpile_module(transpiler: Transpiler, name: string) {
        try {
            const modulePath = this.toString();
            const m = eval("require('" + modulePath + "')");
            if(!m)
                return false;
            else {
                transpiler.append("var ").append(name).append(" = require('").append(modulePath).append("').").append(name).append(";").newLine();
                return true;
            }
        } catch (e) {
            return false;
        }
    }

    transpile_runtime(transpiler: Transpiler, name: string) {
        try {
            const path = importPathIfNode()!;
            const folder = path.sep + "JavaScript-Core" + path.sep;
            const idx = module.filename.lastIndexOf(folder);
            const rootPath = module.filename.substring(0, idx + 1) + "JavaScript-Runtime" + path.sep + "src" + path.sep + "main" + path.sep;
            // for now let's assume prompto and the required module are at the same level
            const modulePath = rootPath + this.toString();
            const m = eval("require('" + modulePath + "')");
            if(!m)
                return false;
            else {
                transpiler.append("var ").append(name).append(" = require('").append(modulePath).append("').").append(name).append(";").newLine();
                return true;
            }

        } catch (e) {
            // process.stderr.write("Failed requiring " + modulepath + "\n");
            return null;
        }
    }

    transpile_path(transpiler: Transpiler, name: string, part: string, replaceBy?: string) {
        try {
            const path = importPathIfNode()!;
            const folder = path.sep + part + path.sep;
            const idx = module.filename.lastIndexOf(folder);
            let rootPath = module.filename.substring(0, idx + 1);
            if(replaceBy)
                rootPath = rootPath + replaceBy + "/";
            const modulePath = rootPath + this.toString();
            const m = eval("require('" + modulePath + "')");
            if(!m)
                return false;
            else {
                transpiler.append("var ").append(name).append(" = require('").append(modulePath).append("').").append(name).append(";").newLine();
                return true;
            }
        } catch (e) {
            return null;
        }
    }

    toDialect(writer: CodeWriter): void {
        writer.append(" from module: ");
        this.ids.forEach(id => {
            if("js"==id) {
                writer.trimLast(1);
                writer.append('.');
            }
            writer.append(id);
            writer.append('/');
        });
        writer.trimLast(1);
    }
}
