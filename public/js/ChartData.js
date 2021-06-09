class ChartData {

    type = 'line';

    category;

    timeLabels = [];
    countyLabels = [];
    countyDataArray = {};

    singleItemCheck = true;

    rangeStartYear = 0;
    rangeStartMonth = 0;
    rangeEndYear = 9999;
    rangeEndMonth = 9999;
    rangeYear = 0;
    rangeMonth = 0;

    constructor() {
        this.category = new Category();
        // this.countyLabels = ['AA', 'BB', 'CC'];
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

        this.rangeYear = newStartYear;
        this.rangeMonth = newStartMonth;

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

    getLines() {
        var lines = [];
        // index 0 is ian 2019
        this.countyLabels.forEach((countyLabel, i) => {
            let label = countyLabel.toLowerCase();

            let line = [];
            let county = this.countyDataArray[label];
            // console.log('####################');
            // console.log(county);

            // prin asta parcurg lunile
            let startIndex = (this.rangeStartYear - 2019) * 12 + this.rangeStartMonth - 1;
            let endIndex = (this.rangeEndYear - 2019) * 12 + this.rangeEndMonth - 1;
            for(let i = startIndex; i <= endIndex; i++) {

                let value;
                try {
                    value = county[i].counties[label][this.category.categoryLabel][this.category.getSelectedItems()[0]];
                } catch(e) {
                    value = line.length > 0 ? line[line.length - 1] : 0;
                }
                line.push(value);
            }
            lines.push(line);
        });
        return lines;
    }

    getBars() {
        var bars = [];
        // o linie are sv - total, is - total, b - total
        // a 2-a linie are sv - male, is - male, b - male
        // liniile sunt nr_judete grupuri de bare
        // un grup are bare pt total, male, female
        this.category.getSelectedItems().forEach((label) => {
            var barSet = [];

            // prin asta parcurg judetele
            let index = (this.rangeYear - 2019) * 12 + this.rangeMonth - 1;
            for(let key in this.countyDataArray) {
                let county = this.countyDataArray[key];
                try {
                    value = county[index].counties[Object.keys(county[index].counties)[0]][this.category.categoryLabel][label];
                } catch(e) {
                    value = barSet.length > 0 ? barSet[barSet.length - 1] : 0;
                }
                barSet.push(value);
            }
            // this.countyDataArray.forEach((county, i) => {
            //     let value = county[index].counties[Object.keys(county[index].counties)[0]][this.category.categoryLabel][label];
            //     barSet.push(value);
            // });
            bars.push(barSet);
        });
        return bars;
    }

    getPies() {
        // console.log('start here #################');
        var pies = [];
        // un pie are is - male 53%, female 47%
        this.countyLabels.forEach((countyLabelUppercase, i) => {
            let countyLabel = countyLabelUppercase.toLowerCase();

            let pie = [];
            let county = this.countyDataArray[countyLabel];

            // prin asta parcurg item-urile din categorii
            let index = (this.rangeYear - 2019) * 12 + this.rangeMonth - 1;
            this.category.getSelectedItems().forEach((label) => {
                // console.log(countyLabel);
                // console.log(county[index]);
                let value;
                try {
                    value = county[index].counties[countyLabel][this.category.categoryLabel][label];
                } catch(e) {
                    value = pie.length > 0 ? pie[pie.length - 1] : 0;
                }
                pie.push(value);
            });
            pies.push(pie);
        });

        // console.log(pies);
        // console.log('end here #################');
        return pies;
    }

}
