export default class Likes {
    constructor() {
        this.readDataFromLocalStorage();
        if (!this.likes) this.likes = [];
    }

addLike(id, title, publisher, img) {
    const like = {id, title, publisher, img};
    this.likes.push(like);

    // storage ruu hadgalna
    this.saveDataToLocalStorage();
    return like;
  }
  deleteLike(id) {
     // 1. id gedeg ID-tei ortsiin index-g massiv-aas haij olno
    const index = this.likes.findIndex(el => el.id === id);

    // 2. ug index deerh element-g massiv-s ustgana
    this.likes.splice(index, 1);

    // storage ruu hadgalna
    this.saveDataToLocalStorage();
  }
  isLiked(id) {
    // if (this.likes.findIndex(el => el.id === id) === -1) return false;
    // else return true;

    return this.likes.findIndex(el => el.id === id) !== -1;
  }
  getNumberOfLikes() {
    return this.likes.length;
  }
  saveDataToLocalStorage() {
    // LocalStorage-d string helbereer hadgalah shaardlagatai
    localStorage.setItem("likes", JSON.stringify(this.likes));
  }
  readDataFromLocalStorage() {
    this.likes = JSON.parse(localStorage.getItem("likes"));
  }
}