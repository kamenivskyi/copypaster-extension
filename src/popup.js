const $count = document.getElementById("count-code-lines");

chrome.runtime.sendMessage({ action: "get-count" }, (response) => {
  console.log("response: ", response);
  render($count, response.count);
});

function render(element, count) {
  element.textContent = count;
}

// console.log("count: ", $count);
