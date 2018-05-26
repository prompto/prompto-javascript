var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
var path = isNodeJs ? require('path') : null;

function JavaScriptModule(ids) {
    this.ids = ids;
}

JavaScriptModule.prototype.toString = function() {
    var res = this.ids.join("/");
    if("js"==this.ids[this.ids.length-1]) {
        res = res.replace("/js", ".js")
    }
    return res;
}

JavaScriptModule.prototype.resolve = function() {
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
    return null;
};


JavaScriptModule.prototype.resolve_webpack = function() {
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
};


JavaScriptModule.prototype.resolve_module = function() {
    try {
        var rootPath = this.toString();
        return eval("require('" + rootPath + "')");
    } catch (e) {
        return null;
    }
};



JavaScriptModule.prototype.resolve_runtime = function() {
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
};


JavaScriptModule.prototype.resolve_path = function(part) {
    try {
        var folder = path.sep + part + path.sep;
        var idx = module.filename.lastIndexOf(folder);
        var rootPath = module.filename.substring(0, idx + 1);
        // for now let's assume prompto and the required module are at the same level
        var modulePath = rootPath + this.toString();
        return eval("require('" + modulePath + "')");
    } catch (e) {
        return null;
    }
};

JavaScriptModule.prototype.transpile = function(transpiler, name) {
    if(this.transpile_webpack(transpiler, name))
        return;
    else if(this.transpile_module(transpiler, name))
        return;
    else if(this.transpile_runtime(transpiler, name))
        return;
    else if(this.transpile_path(transpiler, name, "prompto"))
        return;
    else if(this.transpile_path(transpiler, name, "main"))
        return;
    else
        throw new SyntaxError("Cannot locate module: " + this.toString());
};

JavaScriptModule.prototype.transpile_webpack = function(transpiler, name) {
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
};


JavaScriptModule.prototype.transpile_module = function(transpiler, name) {
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
        return null;
    }
};



JavaScriptModule.prototype.transpile_runtime = function(transpiler, name) {
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
};


JavaScriptModule.prototype.transpile_path = function(transpiler, name, part) {
    try {
        var folder = path.sep + part + path.sep;
        var idx = module.filename.lastIndexOf(folder);
        var rootPath = module.filename.substring(0, idx + 1);
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
        return null;
    }
};



JavaScriptModule.prototype.toDialect = function(writer) {
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


exports.JavaScriptModule = JavaScriptModule;