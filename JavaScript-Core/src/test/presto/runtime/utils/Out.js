function Out() {
}

Out.oldWrite = null;
Out.output = null;
Out.wasNL = true;

Out.init = function() {
    return;
	Out.oldWrite = process.stdout.write;
	Out.output = [];
	process.stdout.write = function(s) {
		if(Out.wasNL) {
			Out.output.push(s);
		} else {
			Out.output[Out.output.length-1] += s;
		}
		Out.wasNL = s[s.length-1] == "\n";
	};
};
	
Out.read = function() {
	var result = Out.output.length===0 ? "" : Out.output.join("\n");
	Out.output = [];
	return result;
};
	
Out.reset = function() {
	Out.output = [];
	Out.wasNL = true;
};

Out.restore = function() {
    return;
	process.stdout.write = Out.oldWrite;
	Out.oldWrite = null;
	Out.output = [];
	Out.wasNL = true;
}

exports.Out = Out;