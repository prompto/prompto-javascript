const isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
const path = isNodeJs ? require('path') : null;

export default class JavaScriptModule {

    constructor(ids) {
        this.ids = ids;
    }

    toString() {
        let res = this.ids.join("/");
        if("js"==this.ids[this.ids.length-1]) {
            res = res.replace("/js", ".js")
        }
        return res;
    }

    resolve() {
        let o = this.resolve_webpack();
        if(o!=null) {
            return o;
        }
        o = this.resolve_module();
        if(o!=null) {
            return o;
        }
        o = this.resolve_runtime();
        if(o!=null) {
            return o;
        }
        o = this.resolve_path("prompto");
        if(o!=null) {
            return o;
        }
        o = this.resolve_path("main");
        if(o!=null) {
            return o;
        }
        o = this.resolve_path("main", "test");
        if(o!=null) {
            return o;
        }
        return null;
    }

    resolve_webpack() {
        try {
            // get a copy of the path identifiers
            const ids = [].concat(this.ids);
            // drop the 'js' extension
            if(ids[ids.length-1]=="js")
                ids.pop();
            // last id is the function, forget it
            ids.pop();
            // eval root module
            let m = eval(ids.shift());
            // drill down
            ids.forEach(id => {
                m = m ? m[id] || null : null;
            });
            return m || null;
        } catch (e) {
            return null;
        }
    }

    resolve_module() {
        try {
            const rootPath = this.toString();
            return eval("require('" + rootPath + "')");
        } catch (e) {
            return null;
        }
    }

    resolve_runtime() {
        try {
            const folder = path.sep + "JavaScript-Core" + path.sep;
            const idx = module.filename.lastIndexOf(folder);
            const rootPath = module.filename.substring(0, idx + 1) + "JavaScript-Runtime" + path.sep + "src" + path.sep + "main" + path.sep;
            // for now let's assume prompto and the required module are at the same level
            const modulePath = rootPath + this.toString();
            return eval("require('" + modulePath + "')");
        } catch (e) {
            // process.stderr.write("Failed requiring " + modulepath + "\n");
            return null;
        }
    }

    resolve_path(part, replace) {
        try {
            const folder = path.sep + part + path.sep;
            const idx = module.filename.lastIndexOf(folder);
            let rootPath = module.filename.substring(0, idx + 1);
            if(replace)
                rootPath = rootPath + replace + "/";
            const modulePath = rootPath + this.toString();
            return eval("require('" + modulePath + "')");
        } catch (e) {
            return null;
        }
    }

    transpileWidget(transpiler) {
        let ids = this.ids;
        if("js"==ids[ids.length-1]) {
            ids = ids.pop()
        }
        transpiler.append(ids.join("."));
    }

    transpile(transpiler, name) {
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

    transpile_intrinsic(transpiler, name) {
        return this.ids[0]==="prompto" && this.ids[1]==="intrinsic";
    }

    transpile_webpack(transpiler, name) {
        try {
            // get a copy of the path identifiers
            const ids = [].concat(this.ids);
            // drop the 'js' extension
            if(ids[ids.length-1]=="js")
                ids.pop();
            // last id is the function, forget it
            ids.pop();
            // eval root module
            let m = eval(ids.shift());
            // drill down
            ids.forEach(id => {
                m = m ? m[id] || null : null;
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

    transpile_module(transpiler, name) {
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

    transpile_runtime(transpiler, name) {
        try {
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

    transpile_path(transpiler, name, part, replace) {
        try {
            const folder = path.sep + part + path.sep;
            const idx = module.filename.lastIndexOf(folder);
            let rootPath = module.filename.substring(0, idx + 1);
            if(replace)
                rootPath = rootPath + replace + "/";
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

    toDialect(writer) {
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
