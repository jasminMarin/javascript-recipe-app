require("@babel/polyfill");
import axios from "axios";
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from './view/base';
import * as searchView from "./view/searchView";
/**
 * Web app - n tuluv
 * - Hailtin query, ur dun
 * - Tuhain uzuulj baigaa jor
 * - Likelasan joruud
 * - Zahialj baigaa joriin nairlaga-nuud
 */

const state = {};
const controlSearch = async() => {
    // 1. Web-s hailtiin tulhuur ugiig gargaj avna
    const query =  searchView.getInput();
    if (query) {
    // 2. Shineer hailtiin object-g uusgej ugnu
        state.search = new Search(query);

    // 3. Hailt hiihed zoriulj delgetsiin UI-g beldene
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);

    // 4. Hailtiig guitsetgene
    await state.search.doSearch();

    // 5. Hailtiin ur dung delgetsend uzuulne
    clearLoader();
    if (state.search.result === undefined) alert("Hailt ulertsgui ...");
    else searchView.renderRecipes(state.search.result);
 };
};

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});

elements.pageButtons.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline");
  
    if (btn) {
      const gotoPageNumber = parseInt(btn.dataset.goto, 10);
      searchView.clearSearchResult();
      searchView.renderRecipes(state.search.result, gotoPageNumber);
    }
  });