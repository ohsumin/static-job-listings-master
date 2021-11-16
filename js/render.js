export default function renderJob(jobList) {
    let jobItemHtml = '';
    for(let jobItem of jobList) {
        let badgeHtml = '';
        let filterItemsHtml = '';
        if(jobItem.new) {
            badgeHtml += `
                <section class="badge-new">
                    NEW!
                </section>
            `
        }
        if(jobItem.featured) {
            badgeHtml += `
                <section class="badge-featured">
                    FEATURED
                </section>
            `
        }
        for(let filterItem of jobItem.languages.concat(jobItem.tools)) {
            filterItemsHtml += `
                <section class="badge-filter">${filterItem}</section>
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
}