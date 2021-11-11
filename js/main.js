import jobList from "../data.js";

// 선택되어있는 필터(클로저 활용)
let filter = filterClosure();

renderJob(jobList);

document.getElementById("filter-clear").addEventListener('click', () => filter.clearFilter());

function renderJob(jobList) {
    let jobItemHtml = '';
    for(let jobItem of jobList) {
        let badgeHtml = '';
        let filterItemsHtml = '';
        if(jobItem.new) {
            badgeHtml += `
                <section id="badge-new">
                    NEW!
                </section>
            `
        }
        if(jobItem.featured) {
            badgeHtml += `
                <section id="badge-featured">
                    FEATURED
                </section>
            `
        }
        for(let filterItem of jobItem.languages.concat(jobItem.tools)) {
            filterItemsHtml += `
                <section class="badge-filter-text">${filterItem}</section>
            `
        }
        jobItemHtml += `
            <section class="job-item">
                <section class="job-logo">
                    <img src="${jobItem.logo}"/>
                </section>
                <section class="job-detail">
                    <section class="job-detail-header">
                        <section class="job-company">
                            ${jobItem.company}
                        </section>
                        ${badgeHtml && badgeHtml}
                    </section>
                    <section class="job-detail-content">
                        ${jobItem.position}
                    </section>
                    <section class="job-detail-footer">
                        <span>${jobItem.postedAt}</span>
                        <section class="circle"></section>
                        <span>${jobItem.contract}</span>
                        <section class="circle"></section>
                        <span>${jobItem.location}</span>
                    </section>
                </section>
                <section class="job-filter-items">
                    ${filterItemsHtml}
                </section>
            </section>
        `
    }
    document.getElementById("job-list").innerHTML = jobItemHtml;

    Array.from(document.getElementsByClassName("filter-item")).forEach((filterItem) => {
        let badgeFilter = filterItem.getElementsByClassName('badge-filter-text')[0];
        badgeFilter.addEventListener('click', () => handleFilterClick(filterItem));
    })
    
    Array.from(document.getElementsByClassName("badge-filter-text")).forEach((filterBadge) => {
        filterBadge.addEventListener('click', () => handleBadgeClick(filterBadge));
    })
    
}

function filterClosure() {
    let selectedFilter = [];
    let filterItemsElem = document.getElementById('filter-items');
    return {
        addFilter: function (filterItemText) {
            if(!selectedFilter.includes(filterItemText)) {
                selectedFilter.push(filterItemText);  
                let filterItemElem = document.createElement('section');
                filterItemElem.className = 'filter-item';
                filterItemElem.setAttribute('category', filterItemText)
                filterItemElem.innerHTML = `
                    <section class="badge-filter-text">${filterItemText}</section>
                    <section class="badge-filter-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path fill="#FFF" fill-rule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/></svg>
                    </section>
                `;
                filterItemsElem.append(filterItemElem);
                // filter item icon에 이벤트 연결
                filterItemElem.getElementsByClassName('badge-filter-icon')[0]
                    .addEventListener('click', () => filterDeleteClick(filterItemText));
                search();
            }
        },
        deleteFilter: function (filterItemText) {
            selectedFilter = selectedFilter.filter((el) => el !== filterItemText); 
            filterItemsElem.querySelector(`[category=${filterItemText}]`).remove();
            search();
        },
        clearFilter: function () {
            selectedFilter = [];
            Array.from(filterItemsElem.getElementsByClassName('filter-item')).forEach((filterItemElem) => {
                filterItemElem.remove();
            });
            search();
        },
        getFilter: function () {
            return selectedFilter;
        }
    }
}

function search() {
    let filteredJobList = [];
    let selectedFilter = filter.getFilter();
    for(let selectedFilterItem of selectedFilter) {
        filteredJobList = filteredJobList.concat(jobList.filter((jobItem) => 
            jobItem.languages.concat(jobItem.tools).includes(selectedFilterItem)
        ));
    }
    // 중복제거
    filteredJobList = filteredJobList.filter(
        (arr, index, callback) => index === callback.findIndex(t => t.id === arr.id)
    );

    renderJob(filteredJobList.length === 0 ? jobList : filteredJobList);
}

function filterDeleteClick(filterItemText) {
    filter.deleteFilter(filterItemText);
}

function handleBadgeClick(filterBadge) {
    let filterBadgeName = filterBadge.innerHTML;
    filter.addFilter(filterBadgeName);
}

