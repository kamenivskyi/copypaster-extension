const codeContainers = document.querySelectorAll("pre");

const copyToClipboard = (textToCopy, callback = () => {}) => {
  navigator.clipboard.writeText(textToCopy).then(() => {
    console.log("successfully copied!");
    notify();
    callback();
    sendSelectedCode(textToCopy);

    // example communication with background script
    exampleSendMessageToBackground();
  });
};

function sendSelectedCode(code) {
  chrome.runtime.sendMessage({ action: "selected-code", code }, (count) => {});
}

function exampleSendMessageToBackground() {
  chrome.runtime.sendMessage(
    { action: "blabla-example", data: "blabla example data here" },
    (count) => {}
  );
}

const createCopyButton = (codeText) => {
  const button = document.createElement("button");
  button.className = "copy-code-btn";
  button.textContent = "Copy";
  button.type = "button";

  button.addEventListener("click", () => copyToClipboard(codeText));

  return button;
};

function notify() {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("execute.js");

  document.body.appendChild(script);

  script.addEventListener("load", () => {
    script.remove();
  });
}

const handleContainer = (codeContainer) => {
  const code = codeContainer.querySelector("code");
  const copyButton = createCopyButton(code.textContent);

  const root = document.createElement("div");
  root.style.position = "relative";

  const shadowRoot = root.attachShadow({ mode: "open" });
  const cssUrl = chrome.runtime.getURL("content-script.css");
  const link = createLinkTag(cssUrl);

  shadowRoot.append(link);

  shadowRoot.prepend(copyButton);

  codeContainer.style.position = "relative";
  codeContainer.prepend(root);
};

[...codeContainers].forEach(handleContainer);

function getAllCode() {
  return [...codeContainers]
    .map((codeContainer, idx) => {
      const code = codeContainer.querySelector("code").textContent;
      const numeratedCode = "// code block #" + (idx + 1) + " \n" + code;

      return numeratedCode;
    })
    .join(`\n`);
}

function createLinkTag(url) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;

  return link;
}

chrome.runtime.onMessage.addListener((req, info, callback) => {
  if (req.action === "copy-all") {
    const allCode = getAllCode();

    copyToClipboard(allCode, () => callback(allCode));

    return true; // if we use async code here we should return true
  }
});
