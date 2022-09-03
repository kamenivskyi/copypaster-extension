const codeContainers = document.querySelectorAll(".s-code-block");

const copyToClipboard = (textToCopy) => {
  navigator.clipboard.writeText(textToCopy).then(() => {
    console.log("successfully copied!");
  });
};

const createCopyButton = (codeText) => {
  const button = document.createElement("button");
  button.style.position = "absolute";
  button.style.right = "10px";
  button.style.top = "10px";
  button.textContent = "Copy";

  button.addEventListener("click", () => copyToClipboard(codeText));

  return button;
};

const handleContainer = (codeContainer) => {
  const code = codeContainer.querySelector("code");
  const copyButton = createCopyButton(code.textContent);

  codeContainer.style.position = "relative";
  codeContainer.appendChild(copyButton);
};

[...codeContainers].forEach(handleContainer);
