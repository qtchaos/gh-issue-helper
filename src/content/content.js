import { loadIssues } from "./lib/issues.js";
import { getStorageIdentifier } from "./lib/util.js";

let observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "childList") {
      init();
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

function init() {
  let storage_identifier = getStorageIdentifier();
  if (localStorage.getItem(storage_identifier) == null) {
    localStorage.setItem(storage_identifier, JSON.stringify([]));
  }

  loadIssues(storage_identifier);
}
