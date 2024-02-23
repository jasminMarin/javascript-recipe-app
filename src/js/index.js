require("@babel/polyfill");
import axios from "axios";
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from './view/base';
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import { renderRecipe, clearRecipe, highlightSelectedRecipe } from "./view/recipeView";
import List from "./model/List";
import * as listView from "./view/listView";
import Like from "./model/Like";
import * as likesView from "./view/likesView";

/**
 * Web app - n tuluv
 * - Hailtin query, ur dun
 * - Tuhain uzuulj baigaa jor
 * - Likelasan joruud
 * - Zahialj baigaa joriin nairlaga-nuud
 */

const state = {};
/**
 * Hailtiin Controller
 */
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
/**
 * Joriin Controller
 */
const controlRecipe = async () => {
    // 1. URL-s ID-iig salgaj avna
    const id = window.location.hash.replace("#", "");
    
    // URL deer id baigaa esehiig shalgana
    if (id) {
        // 2. Joriin model-iig uusgene
        state.recipe = new Recipe(id);

        // 3. UI delgetsiig belgene
        clearRecipe();
        renderLoader(elements.recipeDiv);
        highlightSelectedRecipe(id);
        
        // 4. Joroo tataj avchirna
        await state.recipe.getRecipe();

        // 5. Joriig guitsetgeh hugatsaa bolon ortsiig tootsoolno
        clearLoader();
        state.recipe.calcTime();
        state.recipe.calcHuniiToo();

        // 6. Joroo delgetsend gargana
        renderRecipe(state.recipe, state.likes.isLiked(id));
    }
};
["hashchange", "load"].forEach(event => window.addEventListener(event, controlRecipe));

window.addEventListener("load", e => {
    // Shineer like model-iig app achaalagdahad uusgene
    if(!state.likes) state.likes = new Like();

    // Like tsesiig gargah esehiig shiideh
    likesView.toggleLikeMenu(state.likes.getNumberOfLikes());

    // Like-uud baival tsesend nemj haruulna
    state.likes.likes.forEach(like => likesView.renderLike(like));
});

/**
 * Nairlagani Controller
 */
const controlList = () => {
    // 1. Nairlaga-nii odel uusgene
    state.list = new List();
    listView.clearItems();

    // 2. Ug model ru odoo haragdaj baigaa jor-nii buh nairlaga-g hiine
    state.recipe.ingredients.forEach(n => {
        // Tuhain nairlagiig model-d hiine
        const item = state.list.addItem(n);

        // Tuhain nairlagiig delgetsend gargana
        listView.renderItem(item);
    });
};

/**
 * Like Controller
 */
const controlLike = () => {
    // 1. Like-n model-iig uusgene
    if(!state.likes) state.likes = new Like();

    // 2. Odoo haragdaj baigaa ID-g olj avah
    const currentRecipeId = state.recipe.id;
    
    // 3. Ene Jor-g like-lasan esehiig shalgah
    if (state.likes.isLiked(currentRecipeId)) {
    // Like-lasan bol Like-iig ni ustgana
    state.likes.deleteLike(currentRecipeId);
    likesView.toggleLikeBtn(false);
    likesView.deleteLike(currentRecipeId);
    } else {
    // Like-laagui bol like-lana
    const newLike = state.likes.addLike(
        currentRecipeId, 
        state.recipe.title, 
        state.recipe.publisher, 
        state.recipe.image_url
        );
        likesView.renderLike(newLike);
        likesView.toggleLikeBtn(true);   
    }
    likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
};

elements.recipeDiv.addEventListener("click", e => {
    if (e.target.matches(".recipe__btn, .recipe__btn *")) {
        controlList();
    } else if (e.target.matches(".recipe__love, .recipe__love *")) {
        controlLike();
    }
});

elements.shoppingList.addEventListener("click", e => {
    // click hiisen li elementiin id-g shuuj avah
    const id = e.target.closest(".shopping__item").dataset.itemid;
    
    // oldson id-tei ortsiig model-s ustgana
    state.list.deleteItem(id);

    // delgets-ees iim id-tei ortsiig ustgana
    listView.deleteItem(id);

});