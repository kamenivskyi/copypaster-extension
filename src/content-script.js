const codeContainers = document.querySelectorAll(".s-code-block");

const copyToClipboard = (textToCopy) => {
  navigator.clipboard.writeText(textToCopy).then(() => {
    console.log("successfully copied!");
    notify();
  });
};

const createCopyButton = (codeText) => {
  const button = document.createElement("button");
  button.className = "copy-code-btn";
  button.textContent = "Copy";
  button.type = "button";

  button.addEventListener("click", () => copyToClipboard(codeText));

  return button;
};

const handleContainer = (codeContainer) => {
  const code = codeContainer.querySelector("code");
  const copyButton = createCopyButton(code.textContent);

  const root = document.createElement("div");
  root.style.position = "relative";

  const shadowRoot = root.attachShadow({ mode: "open" });
  const cssUrl = chrome.runtime.getURL("content-script.css");
  shadowRoot.innerHTML = `<link rel="stylesheet" href="${cssUrl}"></link>`;

  shadowRoot.prepend(copyButton);

  codeContainer.style.position = "relative";
  codeContainer.prepend(root);
};

[...codeContainers].forEach(handleContainer);

function notify() {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("execute.js");

  document.body.appendChild(script);

  script.addEventListener("load", () => {
    script.remove();
  });
}
