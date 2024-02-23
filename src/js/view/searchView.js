import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

const renderRecipe = (recipe) => {
    const markup = `
    <li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
    </li>
    `;
    elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};
export const clearSearchQuery = () => {
    elements.searchInput.value = "";
};

export const clearSearchResult = () => {
    elements.searchResultList.innerHTML = "";
	elements.pageButtons.innerHTML = "";
};
export const renderRecipes =(recipes, currentPage = 1, resPerPage = 10) => {
    // 1. Hailtiin ur dung huudaslaj uzuuleh
    const start = (currentPage - 1) * resPerPage;
    const end = currentPage * resPerPage;														 

	recipes.slice(start, end).forEach(el => renderRecipe(el));
	// Huudaslaltiin tovchluuruudiig gargaj ireh
	const totalPages = Math.ceil(recipes.length / resPerPage);
    renderButtons(currentPage, totalPages);									 
 };	
 
// type ===> 'prev', 'next'
const createButton = (
page, 
type, 
direction
) => `<button class="btn-inline results__btn--${type}" data-goto=${page}>
        <span>Хуудас ${page}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${direction}"></use>
        </svg>
        </button>`;

const renderButtons = (currentPage, totalPages) => {
    let buttonHtml;
    if(currentPage === 1 && totalPages > 1) {
        // 1-r huudsan deer baina, 2-r huudas gedeg tovch gargana
        buttonHtml = createButton(2, "next", "right");
    } else if (currentPage < totalPages) {
        // Umnuh bolon daraagiin huudas ru shiljih tovch-g uzuulne
        buttonHtml = createButton(currentPage - 1, "prev", "left");
        buttonHtml += createButton(currentPage + 1, "next", "right");
    } else if (currentPage === totalPages) {
        // Hamgiin suulin huudas deer baina. Umnuh ruu shiljuuleh tovchiig uzuulne
        buttonHtml = createButton(currentPage - 1, "prev", "left");
    }									   
	elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHtml);
};									  													