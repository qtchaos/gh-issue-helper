export function getStorageIdentifier() {
  let owner_class = "AppHeader-context-item-label";
  let project = document
    .getElementsByClassName(owner_class)[0]
    .innerText.trim();
  let owner = document.getElementsByClassName(owner_class)[1].innerText.trim();
  return `${owner}/${project}`;
}
