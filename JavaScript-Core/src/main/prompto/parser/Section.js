var Location = require("./Location").Location;

function Section(copyFrom) {
    if(!copyFrom)
        copyFrom = { path : "", start : null, end : null, dialect : null, breakpoint : null };
	this.path = copyFrom.path;
	this.start = copyFrom.start;
	this.end = copyFrom.end;
    this.dialect = copyFrom.dialect;
	this.breakpoint = copyFrom.breakpoint;
	return this;
}

Section.prototype.setFrom = function(path, start, end, dialect) {
	this.path = path;
	this.start = new Location(start);
	this.end = new Location(end, true);
    this.dialect = dialect;
	this.breakpoint = false;
};
	
exports.Section = Section;