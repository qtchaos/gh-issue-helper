import { getStorageIdentifier } from "./util.js";
import { changeIssueStatus } from "./issues.js";

export function handleContainerClick(event) {
  let icon = event.target.closest("svg");
  if (!icon) return;

  let element = icon.parentElement.parentElement.parentElement.parentElement;
  console.log("Clicked on issue container", element);
  let id = parseInt(element.id.split("_")[1]);

  handleClick(element, id);
}

function handleClick(element, id) {
  console.log("Clicked on issue", id);
  changeIssueStatus(element, getStorageIdentifier(), id);
}
