export default class Score(value, name) {
	this.value = value;
	this.name = name;
	return this;
}

Score.BETTER = new Score(1, "BETTER");
Score.WORSE = new Score(-1, "WORSE");
Score.SIMILAR = new Score(0, "SIMILAR");

