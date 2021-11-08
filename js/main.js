const filterItems = [
    "Frontend",
    "Backend",
    "Fullstack",
    "Junior",
    "Midweight",
    "Senior",
    "Python",
    "Ruby",
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "Sass",
    "Vue",
    "Django",
    "RoR"
]

const handleFilter = (filterItem) => {
    let filterBadge = filterItem.getElementsByClassName('badge-filter')[0];
    if(filterBadge) {
        // filter badge class name 변경 (badge-filter -> badge-filter-text)
        filterBadge.className = 'badge-filter-text';
        let deleteIcon = document.createElement('section');
        deleteIcon.className = 'badge-filter-icon';
        deleteIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path fill="#FFF" fill-rule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/></svg>';
        deleteIcon.addEventListener('click', () => handleDelete(filterItem));
        // filter badge 옆에 delete icon 추가
        filterBadge.after(deleteIcon);
    }
}

const handleDelete = (filterItem) => {
    let filterBadgeText = filterItem.getElementsByClassName('badge-filter-text')[0];
    let filterBadgeIcon = filterItem.getElementsByClassName('badge-filter-icon')[0];
    // filter badge class name 변경 (badge-filter-text -> badge-filter)
    filterBadgeText.className = 'badge-filter';
    // filter badge icon(삭제아이콘) 제거
    filterBadgeIcon.remove();
}

// filter items render
document.getElementById("filter-list").innerHTML = function () {
    let html = "";
    for (filterItem of filterItems){ 
        html = html + `
            <section class="filter-item">
                <section class="badge-filter">${filterItem}</section>
            </section>
        `;
    }
    return html;
}();

Array.from(document.getElementsByClassName("filter-item")).forEach((filterItem) => {
    let badgeFilter = filterItem.getElementsByClassName('badge-filter')[0];
    badgeFilter.addEventListener('click', () => handleFilter(filterItem));
})



