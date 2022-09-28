/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {AttributeInfo, IStored, MatchOp} from '../store'
import MemPredicate from "./MemPredicate";

export default class MatchPredicate implements MemPredicate {

    info: AttributeInfo;
    matchOp: MatchOp;
    value: any;

    constructor(info: AttributeInfo, matchOp: MatchOp, value: any) {
        this.info = info;
        this.matchOp = matchOp;
        this.value = value;
    }

    matches(stored: IStored): boolean {
        const data = stored.getData(this.info.name);
        return this.matchesData(data);
    }

    matchesData(data: any): boolean {
        switch(this.matchOp) {
            case MatchOp.ROUGHLY:
                if(typeof(data)==typeof(this.value) && typeof(data)==typeof(""))
                    return (data as string).toLowerCase() == (this.value as string).toLowerCase();
                // no-break
            case MatchOp.EQUALS:
                return this.value == data;
            case MatchOp.CONTAINS:
                if(data==null)
                    return false;
                else if(typeof(data)===typeof(""))
                    return (data as string).indexOf(this.value as string)>=0;
                else if(Array.isArray(data)) {
                    for(let i=0;i<data.length;i++) {
                        if(this.matchesData(data[i]))
                            return true;
                    }
                    return false;
                } else
                    return false;
            case MatchOp.HAS:
                if(Array.isArray(data))
                    return data.indexOf(this.value)>=0;
                else if(typeof(data)==typeof(""))
                    return (data as string).indexOf(this.value as string)>=0;
                else
                    return false;
            case MatchOp.IN:
                if(Array.isArray(this.value))
                    return this.value.indexOf(data)>=0;
                else if(typeof(this.value)==typeof(""))
                    return (this.value as string).indexOf(data as string)>=0;
                else
                    return false;
            case MatchOp.LESSER:
                return this.value > data;
            case MatchOp.GREATER:
                return this.value < data;
            default:
                throw new Error("!!!");
        }
    }
}
