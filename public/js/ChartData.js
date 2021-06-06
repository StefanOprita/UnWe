class ChartData {

    type = 'line';

    category;

    timeLabels = [];
    countyLabels = [];
    countyDataArray = [];

    singleItemCheck = true;

    rangeStartYear = 0;
    rangeStartMonth = 0;
    rangeEndYear = 9999;
    rangeEndMonth = 9999;
    rangeYear = 0;
    rangeMonth = 0;

    constructor() {
        this.category = new Category();
        this.countyLabels = ['AA', 'BB', 'CC'];
    }

    createTimeLabels() {
        this.timeLabels = [];

        var currentYear = this.rangeStartYear;
        var currentMonth = this.rangeStartMonth;

        do {
            this.timeLabels.push(monthNames[currentMonth - 1] + '-' + currentYear.toString().slice(-2));
            currentMonth++;
            if(currentMonth > 12) {
                currentMonth = 1;
                currentYear++;
            }
        } while(currentYear < this.rangeEndYear || (currentYear == this.rangeEndYear && currentMonth <= this.rangeEndMonth));
    }

    setRangeStart(value) {
        var newStartYear = parseInt(value.split('-')[0]);
        var newStartMonth = parseInt(value.split('-')[1]);
        if(newStartYear > this.rangeEndYear) return;
        if(newStartYear == this.rangeEndYear && newStartMonth > this.rangeEndMonth) return;

        this.rangeStartYear = newStartYear;
        this.rangeStartMonth = newStartMonth;
        if(this.rangeEndYear != 9999 && this.rangeEndMonth != 9999) this.createTimeLabels();
    }

    setRangeEnd(value) {
        var newEndYear = parseInt(value.split('-')[0]);
        var newEndMonth = parseInt(value.split('-')[1]);
        if(newEndYear < this.rangeStartYear) return;
        if(newEndYear == this.rangeStartYear && newEndMonth < this.rangeStartMonth) return;

        this.rangeEndYear = newEndYear;
        this.rangeEndMonth = newEndMonth;
        this.createTimeLabels();
    }

    setRange(value) {
        var newYear = parseInt(value.split('-')[0]);
        var newMonth = parseInt(value.split('-')[1]);

        this.rangeYear = newYear;
        this.rangeMonth = newMonth;
    }

    getItemClickedFunction() {
        if(this.type.localeCompare('line') == 0) return this.category.singleItemCheckEvent;
        else return this.category.multipleItemCheckEvent;
    }

}
