import jobList from "../data.js";
import { handleBadgeClick, handleDeleteClick, handleClearClick } from "./eventHandler.js";
import renderJob from "./render.js";

renderJob(jobList);
document.getElementById("filter-clear").addEventListener('click', () => handleClearClick());
document.getElementById('job-list').addEventListener('click', (e) => handleBadgeClick(e));
document.getElementById("filter-items").addEventListener('click', (e) => handleDeleteClick(e));


