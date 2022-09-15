let countLinesOfCode = 0;

chrome.commands.onCommand.addListener((command) => {
  if (command === "copy-all") {
    getCurrentTabId().then((tabId) => {
      try {
        chrome.tabs.sendMessage(tabId, { action: "copy-all" }, (allCode) => {
          countLinesOfCode = getLinesOfCode(allCode);
        });
      } catch (error) {
        console.log("err: ", error);
      }
    });
  }
});

chrome.runtime.onMessage.addListener((req, info, callback) => {
  if (req.action === "selected-code") {
    countLinesOfCode = getLinesOfCode(req.code);
  }

  if (req.action === "get-count") {
    callback({ count: getCount() });
  }

  if (req.action === "blabla-example") {
    console.log("its blabla-example!!!: ", req);
  }
});

async function getCurrentTabId() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log("tab: ", tab);
  return tab.id;
}

function getLinesOfCode(codeText) {
  return codeText.split("\n").length;
}

function getCount() {
  return countLinesOfCode;
}
