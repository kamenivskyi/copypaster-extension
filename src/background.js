chrome.commands.onCommand.addListener((command) => {
  if (command === "copy-all") {
    getCurrentTabId().then((tabId) => {
      try {
        chrome.tabs.sendMessage(tabId, { action: "copy-all" }, (allCode) => {});
      } catch (error) {
        console.log("err: ", error);
      }
    });
  }
  console.log(command);
});

async function getCurrentTabId() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log("tab: ", tab);
  return tab.id;
}
