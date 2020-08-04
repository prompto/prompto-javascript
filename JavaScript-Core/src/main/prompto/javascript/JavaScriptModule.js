var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
var path = isNodeJs ? require('path') : null;

class JavaScriptModule {
    constructor(ids) {
        this.ids = ids;
    }

    toString() {
        var res = this.ids.join("/");
        if("js"==this.ids[this.ids.length-1]) {
            res = res.replace("/js", ".js")
        }
        return res;
    }

    resolve() {
        var o = this.resolve_webpack();
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
            var ids = [].concat(this.ids);
            // drop the 'js' extension
            if(ids[ids.length-1]=="js")
                ids.pop();
            // last id is the function, forget it
            ids.pop();
            // eval root module
            var m = eval(ids.shift());
            // drill down
            ids.forEach(function(id) {
                m = m ? m[id] || null : null;
            });
            return m || null;
        } catch (e) {
            return null;
        }
    }

    resolve_module() {
        try {
            var rootPath = this.toString();
            return eval("require('" + rootPath + "')");
        } catch (e) {
            return null;
        }
    }

    resolve_runtime() {
        try {
            var folder = path.sep + "JavaScript-Core" + path.sep;
            var idx = module.filename.lastIndexOf(folder);
            var rootPath = module.filename.substring(0, idx + 1) + "JavaScript-Runtime" + path.sep + "src" + path.sep + "main" + path.sep;
            // for now let's assume prompto and the required module are at the same level
            var modulePath = rootPath + this.toString();
            return eval("require('" + modulePath + "')");
        } catch (e) {
            // process.stderr.write("Failed requiring " + modulepath + "\n");
            return null;
        }
    }

    resolve_path(part, replace) {
        try {
            var folder = path.sep + part + path.sep;
            var idx = module.filename.lastIndexOf(folder);
            var rootPath = module.filename.substring(0, idx + 1);
            if(replace)
                rootPath = rootPath + replace + "/";
            var modulePath = rootPath + this.toString();
            return eval("require('" + modulePath + "')");
        } catch (e) {
            return null;
        }
    }

    transpileWidget(transpiler) {
        var ids = this.ids;
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
            var ids = [].concat(this.ids);
            // drop the 'js' extension
            if(ids[ids.length-1]=="js")
                ids.pop();
            // last id is the function, forget it
            ids.pop();
            // eval root module
            var m = eval(ids.shift());
            // drill down
            ids.forEach(function(id) {
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
            var modulePath = this.toString();
            var m = eval("require('" + modulePath + "')");
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
            var folder = path.sep + "JavaScript-Core" + path.sep;
            var idx = module.filename.lastIndexOf(folder);
            var rootPath = module.filename.substring(0, idx + 1) + "JavaScript-Runtime" + path.sep + "src" + path.sep + "main" + path.sep;
            // for now let's assume prompto and the required module are at the same level
            var modulePath = rootPath + this.toString();
            var m = eval("require('" + modulePath + "')");
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
            var folder = path.sep + part + path.sep;
            var idx = module.filename.lastIndexOf(folder);
            var rootPath = module.filename.substring(0, idx + 1);
            if(replace)
                rootPath = rootPath + replace + "/";
            var modulePath = rootPath + this.toString();
            var m = eval("require('" + modulePath + "')");
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
        this.ids.forEach(function(id) {
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


exports.JavaScriptModule = JavaScriptModule;