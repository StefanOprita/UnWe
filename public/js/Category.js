class Category {

    categoryLabel;
    item = [];

    ageLabels = ['lesser25', 'from25to29', 'from30to39', 'from40to49', 'from50to55', 'greater55'];
    genderLabels = ['male', 'female'];
    educationLabels = ['bachelors', 'highschool', 'middleschool', 'noEducation', 'postHighschool', 'primary', 'professional'];
    environmentLabels = ['urban', 'rural'];
    compensationLabels = ['compensated', 'nonCompensated'];

    constructor() {
        this.items = document.querySelectorAll('.chart-settings-contianer .categories-list input');
    }

    singleItemCheckEvent(element) {
        this.items = document.querySelectorAll('.chart-settings-contianer .categories-list input');
        // this ^ needs to be here because this function is called on click
        // and apparently it can't access global variables of this
        this.items.forEach(el => {
            if(el == element.target) el.checked = true;
            else el.checked = false;
        });
    }

    multipleItemCheckEvent(element) {
        console.log('multiple item check event');
    }

    updateItems() {
        this.items = document.querySelectorAll('.chart-settings-contianer .categories-list input');
    }

    getSelectedItems() {
        var items = [];
        this.items.forEach((item, i) => {
            if(this.categoryLabel.localeCompare('age') == 0) {
                if(item.checked) items.push(this.ageLabels[i]);
            } else if(this.categoryLabel.localeCompare('gender') == 0) {
                if(item.checked) items.push(this.genderLabels[i]);
            } else if(this.categoryLabel.localeCompare('education') == 0) {
                if(item.checked) items.push(this.educationLabels[i]);
            } else if(this.categoryLabel.localeCompare('environment') == 0) {
                if(item.checked) items.push(this.environmentLabels[i]);
            } else if(this.categoryLabel.localeCompare('compensation') == 0) {
                if(item.checked) items.push(this.compensationLabels[i]);
            }
        });

        return items;
    }
}
