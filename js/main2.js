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

// 선택되어있는 필터(클로저 활용)
let selectedFilter = closure();

function closure() {
    let selectedFilter = [];
    return {
        addFilter: function (filterItem) {
            selectedFilter.push(filterItem);  
        },
        deleteFilter: function (filterItem) {
            selectedFilter = selectedFilter.filter((el) => el !== filterItem); 
        },
        clearFilter: function () {
            selectedFilter = [];
            console.log(selectedFilter)
        },
        getFilter: function () {
            return selectedFilter;
        }
    }
}

// filter items render
document.getElementById("filter-items").innerHTML = function () {
    let html = "";
    for (let filterItem of filterItems){ 
        html = html + `
            <section class="filter-item">
                <section class="badge-filter">${filterItem}</section>
            </section>
        `;
    }
    return html;
}();

document.getElementById("filter-clear").addEventListener('click', () => handleClearClick())

const editDomSelected = (filterItem) => {
    // 'selected' 클래스를 추가하여 스타일 변경
    filterItem.className += 'selected';
    let deleteIcon = document.createElement('section');
    deleteIcon.className = 'badge-filter-icon';
    deleteIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path fill="#FFF" fill-rule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/></svg>';
    deleteIcon.addEventListener('click', () => handleDeleteClick(filterItem));
    // filter badge 옆에 delete icon 추가
    filterItem.append(deleteIcon);

    // let filterItemBadge = filterItem.getElementsByClassName('badge-filter')[0];
    // if(filterItemBadge) {
    //     // filter badge class name 변경 (badge-filter -> badge-filter-text)
    //     filterItemBadge.className = 'badge-filter-text';
    //     let deleteIcon = document.createElement('section');
    //     deleteIcon.className = 'badge-filter-icon';
    //     deleteIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path fill="#FFF" fill-rule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/></svg>';
    //     deleteIcon.addEventListener('click', () => handleDeleteClick(filterItem));
    //     // filter badge 옆에 delete icon 추가
    //     filterItemBadge.after(deleteIcon);
    // }
}

const editDomDeleted = (filterItem) => {
    let filterItemText = filterItem.getElementsByClassName('badge-filter-text')[0];
    let filterItemIcon = filterItem.getElementsByClassName('badge-filter-icon')[0];
    // filter badge class name 변경 (badge-filter-text -> badge-filter)
    filterItemText.className = 'badge-filter';
    // filter badge icon(삭제아이콘) 제거
    filterItemIcon.remove();
}

const handleFilterClick = (filterItem) => {
    let filterItemClassName = filterItem.className;
    let selectedFilterName = filterItem.getElementsByClassName("badge-filter")[0]
    // 선택 되어있지 않은 filter item이면 선택 처리
    if(!filterItemClassName.includes('selected')) {
        editDomSelected(filterItem);
        // selectedFilter에 선택한 필터 추가하기
        selectedFilter.addFilter(filterItem.innerText);
    }
    // console.log(filterItemClassName)
    // let filterItemBadge = filterItem.getElementsByClassName('badge-filter')[0];
    // if(filterItemBadge) {
    //     // // filter badge class name 변경 (badge-filter -> badge-filter-text)
    //     // filterBadge.className = 'badge-filter-text';
    //     // let deleteIcon = document.createElement('section');
    //     // deleteIcon.className = 'badge-filter-icon';
    //     // deleteIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path fill="#FFF" fill-rule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/></svg>';
    //     // deleteIcon.addEventListener('click', () => handleDeleteClick(filterItem));
    //     // // filter badge 옆에 delete icon 추가
    //     // filterBadge.after(deleteIcon);

    //     // editDomSelected(filterItem);
    //     // // selectedFilter에 선택한 필터 추가하기
    //     // selectedFilter.addFilter(filterItemBadge.innerText);
    // }
}

const handleDeleteClick = (filterItem) => {
    let filterItemBadge = filterItem.getElementsByClassName('badge-filter-text')[0];
    // let filterBadgeIcon = filterItem.getElementsByClassName('badge-filter-icon')[0];
    // // filter badge class name 변경 (badge-filter-text -> badge-filter)
    // filterBadge.className = 'badge-filter';
    // // filter badge icon(삭제아이콘) 제거
    // filterBadgeIcon.remove();

    // css 수정
    editDomDeleted(filterItem);
    // selectedFilter에 선택한 필터 제거하기
    selectedFilter.deleteFilter(filterItemBadge.innerText);
}

const handleClearClick = () => {
    let selectedFilter = document.getElementsByClassName('badge-filter-text');
    // 선택되어있는 filter clear 처리
    for(filterItem of selectedFilter) {
        editCssDeleted(filterItem);
    }
    selectedFilter.clearFilter();
}
//MEMO : 클래스 네임을 변경해서 css를 바꾸지 말고 부모클래스의 class name을 바꾸기


Array.from(document.getElementsByClassName("filter-item")).forEach((filterItem) => {
    let badgeFilter = filterItem.getElementsByClassName('badge-filter')[0];
    badgeFilter.addEventListener('click', () => handleFilterClick(filterItem));
})



