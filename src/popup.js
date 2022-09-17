const $count = document.getElementById("count-code-lines");

chrome.runtime.sendMessage({ action: "get-count" }, (response) => {
  console.log("r3esponse: ", response);
  render($count, response.count);
});

function render(element, count) {
  element.textContent = count;
}

chrome.storage.onChanged.addListener((changed) => {
  console.log("changed: ", changed);
});

// console.log("count: ", $count);
