class Category {

    item = [];

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
}
