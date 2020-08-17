
export default class TypeMap {
  
    inferType(context, section) {
        const keys = Object.keys(this);
        switch (keys.length) {
            case 0:
                return VoidType.instance;
            case 1:
                return this[keys[0]];
            default:
                return this.doInferType(context, keys, section);
        }
    }

    doInferType(context, keys, section) {
        let inferred = null;
        // first pass: get less specific type
        for(let i=0;i<keys.length;i++) {
            const current = this[keys[i]];
            if(current == NullType.instance) {
                continue;
            } else if(inferred==null) {
                inferred = current;
            } else if(inferred.isAssignableFrom(context, current)) {
                continue;
            } else if(current.isAssignableFrom(context, inferred)) {
                inferred = current;
            } else {
                context.problemListener.reportIncompatibleTypes(section, current, inferred);
            }
        }
        if(inferred==null)
            return NullType.instance;
        // second pass: check compatibility
        keys.forEach(function(k) {
            const type = this[k];
            if(type!=inferred && !inferred.isAssignableFrom(context, type)) {
                context.problemListener.reportIncompatibleTypes(section, inferred, type);
            }
        }, this);
        return inferred;
    }
}

