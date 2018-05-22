var MatchOp = require("../store/MatchOp").MatchOp;

function MatchPredicate(info, matchOp, value) {
    this.info = info;
    this.matchOp = MatchOp[matchOp.name];
    this.value = value;
    return this;
}

MatchPredicate.prototype.matches = function(stored) {
    var data = stored.getData(this.info.name);
    return this.matchesData(data);
};

MatchPredicate.prototype.matchesData = function(data) {
    switch(this.matchOp) {
        case MatchOp.ROUGHLY:
            if(typeof(data)==typeof(this.value) && typeof(data)==typeof(""))
                return data.toLowerCase()==this.value.toLowerCase();
        case MatchOp.EQUALS:
            return this.value==data;
        case MatchOp.CONTAINS:
            if(data==null)
                return false;
            else if(typeof(data)===typeof(""))
                return data.indexOf(this.value)>=0;
            else if(data.length) {
                for(var i=0;i<data.length;i++) {
                    if(this.matchesData(data[i]))
                        return true;
                }
                return false;
            } else
                return false;
        case MatchOp.HAS:
            return data==null ? false: data.indexOf(this.value)>=0;
        case MatchOp.IN:
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