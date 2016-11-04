var MatchOp = require("../store/MatchOp").MatchOp;

function MatchPredicate(info, matchOp, value) {
    this.info = info;
    this.matchOp = matchOp;
    this.value = value;
    return this;
}

MatchPredicate.prototype.matches = function(stored) {
    var data = stored.getData(this.info.name);
    switch(this.matchOp) {
        case MatchOp.ROUGHLY:
            if(typeof(data)==typeof(this.value) && typeof(data)==typeof(""))
                return data.toLowerCase()==this.value.toLowerCase();
        case MatchOp.EQUALS:
            return this.value==data;
        case MatchOp.CONTAINS:
            return data==null ? false: data.indexOf(this.value)>=0;
        case MatchOp.CONTAINED:
            return this.value.indexOf(data)>=0;
        case MatchOp.LESSER:
            return this.value>data;
        case MatchOp.GREATER:
            return this.value<data;
        default:
            throw new Error("!!!");
    }
};

exports.MatchPredicate = MatchPredicate;