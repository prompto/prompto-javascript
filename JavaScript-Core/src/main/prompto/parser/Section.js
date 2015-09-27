var Location = require("./Location").Location;

function Section(section) {
    if(!section)
        section = { path : "", start : null, end : null, dialect : null, breakpoint : null };
    this.copySectionFrom(section);
	return this;
}

Section.prototype.copySectionFrom = function(section) {
    this.path = section.path;
    this.start = section.start;
    this.end = section.end;
    this.dialect = section.dialect;
    this.breakpoint = section.breakpoint;
};

Section.prototype.setSectionFrom = function(path, start, end, dialect) {
	this.path = path;
	this.start = new Location(start);
	this.end = new Location(end, true);
    this.dialect = dialect;
	this.breakpoint = false;
};
	
exports.Section = Section;