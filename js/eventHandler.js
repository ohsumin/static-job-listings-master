import { filter } from "./search.js";

function handleBadgeClick(e) {
    let badge = e.target.closest('.badge-filter');
    if(!badge) return;
    let badgeName = badge.innerHTML;
    filter.addFilter(badgeName);
}

function handleDeleteClick(e) {
    let deleteIcon = e.target.closest('.badge-filter-icon');
    if(!deleteIcon) return;
    let badgeName = deleteIcon.closest('.filter-item').getAttribute('category');
    filter.deleteFilter(badgeName);
}

function handleClearClick() {
    filter.clearFilter();
}

export {
    handleBadgeClick,
    handleDeleteClick,
    handleClearClick
}