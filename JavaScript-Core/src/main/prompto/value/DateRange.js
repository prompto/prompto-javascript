
export default class DateRange extends RangeValue {

    constructor(left, right) {
        super(DateType.instance, left, right);
    }

    size() {
        const h = this.high.value.valueOf();
        const l = this.low.value.valueOf();
        return 1 + ( (h-l)/(24*60*60*1000));
    }

    getItem(index) {
        const millis = this.low.value.valueOf() + (index-1)*(24*60*60*1000);
        if(millis>this.high.value.valueOf()) {
            throw new IndexOutOfRangeError();
        } else {
            return new DateValue(new LocalDate(millis));
        }
    }
}

