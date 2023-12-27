import { handleContainerClick } from "./click.js";
let issue_queue = [];

const IGNORED_COLOR = "#ff4646";
const MAYBE_COLOR = "#ff6d33";
const OK_COLOR = "#3fb950";

export function loadIssues(storage_identifier) {
  let issues = JSON.parse(localStorage.getItem(storage_identifier));
  let raw_issues = document.getElementsByClassName(
    "js-navigation-container"
  )[0];

  for (const element of raw_issues.children) {
    let id = parseInt(element.id.split("_")[1]);
    let issue = getFromId(issues, id);
    if (issue == undefined) {
      // console.log("Issue not found in storage, adding it", id);
      issue = { id: id, status: "ok" };
      issue_queue.push(issue);
    }
    // TODO: if less than 20 issues, dont fill issues with null

    let icon = element.getElementsByTagName("svg")[0];
    let container = document.getElementsByClassName(
      "js-navigation-container"
    )[0];

    container.removeEventListener("click", handleContainerClick);
    container.addEventListener("click", handleContainerClick);

    icon.style.fill = getColorFromStatus(issue.status);
  }
  if (issue_queue.length > 0) {
    // console.log("Issue queue not empty, adding", issue_queue.length, "issues");
    let issues = JSON.parse(localStorage.getItem(storage_identifier));
    for (const issue of issue_queue) {
      issues.push(issue);
    }
    issue_queue = [];
    localStorage.setItem(storage_identifier, JSON.stringify(issues));
  }
}

function getFromId(issues, id) {
  for (const issue of issues) {
    if (issue.id == id) {
      return issue;
    }
  }
  return undefined;
}

function getColorFromStatus(status) {
  if (status == "ok") {
    return OK_COLOR;
  } else if (status == "ignored") {
    return IGNORED_COLOR;
  } else if (status == "maybe") {
    return MAYBE_COLOR;
  }
}

export function changeIssueStatus(element, storage_identifier, selected_id) {
  let l_issues = localStorage.getItem(storage_identifier);
  l_issues = JSON.parse(l_issues);
  l_issues.forEach((issue) => {
    if (issue.id == selected_id) {
      if (issue.status == "ok") {
        issue.status = "ignored";
        element.getElementsByTagName("svg")[0].style.fill = IGNORED_COLOR;
      } else if (issue.status == "ignored") {
        issue.status = "maybe";
        element.getElementsByTagName("svg")[0].style.fill = MAYBE_COLOR;
      } else if (issue.status == "maybe") {
        issue.status = "ok";
        element.getElementsByTagName("svg")[0].style.fill = OK_COLOR;
      }
      localStorage.setItem(storage_identifier, JSON.stringify(l_issues));
    }
  });
}
