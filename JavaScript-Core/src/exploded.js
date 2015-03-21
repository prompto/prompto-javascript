var path = require("path");
var root = path.dirname(module.filename);
var fs = require("fs");

function readSubDirs() {
	var _children = fs.readdirSync(root);
	var children = [];
	for(var i=0;i<_children.length;i++) {
		var _child = _children[i];
		if(_child!=="node_modules") {
			if(_child.indexOf(".")!==0) {
				var _path = root + path.sep + _child;
				var _isdir = fs.lstatSync(_path).isDirectory();
				if(	_isdir )  {
					children.push(_child);
				}
			}
		}
	}
	return children;
}
var children = readSubDirs();

var m = require("module").Module;
var old_resolveLookupPaths = m._resolveLookupPaths;

function new_resolveLookupPaths(request, parent) {
	var resolved = old_resolveLookupPaths(request, parent);
    var start = request.substring(0, 2);
    if (start === './' || start === '..') {
    	// is the calling module in the same hierarchy as the 'exploded' module?
    	if(parent.filename.search(root)===0) {
    		var dirpath = path.dirname(parent.filename);
    		var subpath = dirpath.substring(root.length+1);
    		var idx = subpath.indexOf(path.sep);
    		var folder = subpath.substring(0, idx);
    		subpath = subpath.substring(idx);
        	var paths = resolved[1];
        	var more = [];
        	for(var i=0;i<paths.length;i++) {
        		var _path = paths[i];
        		if(_path.indexOf(root)===0) {
        			if(_path.indexOf(subpath)>root.length) {
	        			for(var j=0;j<children.length;j++) {
	        				var _child = children[j];
	        				if(	_child!==folder) {
	        					var _fullpath = root + path.sep + _child + subpath;
	        					var _exists = fs.existsSync(_fullpath);
	        					if(_exists) {
		        					var _isdir = fs.lstatSync(_fullpath).isDirectory();
		        					if(	_isdir )  {	        					
		        						more.push(_fullpath);
		        					}
	        					}
	        				}
	        			}
        			}
        		}
        	}
        	resolved[1] = paths.concat(more);
    	}
    }
	return resolved;
}

if(m._resolveLookupPaths !== new_resolveLookupPaths) {
	m._resolveLookupPaths = new_resolveLookupPaths;
}