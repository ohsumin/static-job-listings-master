import jobList from "../data.js";
import renderJob from "./render.js";

let filter = filterClosure();

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

export {
    filter
}