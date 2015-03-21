var Location = require("./Location").Location;

function Section() {
	this.path = "";
	this.start = null;
	this.end = null;
	this.breakpoint = false;
	return this;
}

Section.prototype.setFrom = function(path, start, end) {
	this.path = path;
	this.start = new Location(start);
	this.end = new Location(end, true);
	this.breakpoint = false;
};
	
exports.Section = Section;