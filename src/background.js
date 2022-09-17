chrome.commands.onCommand.addListener((command) => {
  if (command === "copy-all") {
    getCurrentTabId().then((tabId) => {
      try {
        chrome.tabs.sendMessage(tabId, { action: "copy-all" }, (allCode) => {
          const count = getLinesOfCode(allCode);
          setCount(count);
        });
      } catch (error) {
        console.log("err: ", error);
      }
    });
  }
});

chrome.runtime.onMessage.addListener((req, info, callback) => {
  if (req.action === "selected-code") {
    const count = getLinesOfCode(req.code);
    setCount(count);
  }

  if (req.action === "get-count") {
    getCount().then((count) => {
      console.log("counter storage: ", count);
      callback({ count });
    });

    return true; // IMPORTANT: needs to return value in callback otherwise will be undefined
  }

  if (req.action === "blabla-example") {
    // console.log("its blabla-example!!!: ", req);
  }
});

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("welcome.html"),
    });
    chrome.runtime.setUninstallURL("http://localhost:4450/leave"); // after uninstall will redirect user to http://localhost:4450/leave page
  }
  console.log("installed: ", data);
});

function setCount(count) {
  chrome.storage.local.set({ linesOfCodeCount: count });
}

async function getCurrentTabId() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  // console.log("tab: ", tab);
  return tab.id;
}

function getLinesOfCode(codeText) {
  return codeText.split("\n").length;
}

async function getCount() {
  return chrome.storage.local.get("linesOfCodeCount").then((data) => {
    return data.linesOfCodeCount ?? 0;
  });
}
