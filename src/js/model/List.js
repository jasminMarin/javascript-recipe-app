import uniqid from "uniqid";

export default class List {
    constructor() {
        this.items = [];
    }
    deleteItem(id) {
        // 1. id gedeg ID-tei ortsiin index-g massiv-aas haij olno
        const index = this.items.findIndex(el => el.id === id);

        // 2. ug index deerh element-g massiv-s ustgana
        this.items.splice(index, 1);
    }
    addItem(item) {
        let newItem = {
            id: uniqid(),
            item: item
        }
        this.items.push(newItem);
        return newItem;
    }
}