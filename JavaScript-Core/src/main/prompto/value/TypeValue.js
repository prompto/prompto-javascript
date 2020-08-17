
export default class TypeValue extends Value{
  
    constructor(value) {
        super(null); // TODO type of type
        this.value = value;
    }

    toString() {
        return this.value.toString();
    }

    getMemberValue(context, name, autoCreate) {
        return this.value.getStaticMemberValue(context, name);
    }
}

