const codeContainer = document.querySelector(".s-code-block");
const code = codeContainer.querySelector("code");
console.log("codeContainer: ", codeContainer);
console.log("code: ", code);

const copyToClipboard = (textToCopy) => {
  navigator.clipboard.writeText(textToCopy).then(() => {
    console.log("successfully copied!");
  });
};

const createCopyButton = () => {
  const button = document.createElement("button");
  button.style.position = "absolute";
  button.style.right = "10px";
  button.style.top = "10px";
  button.textContent = "Copy";

  button.addEventListener("click", () => copyToClipboard(code.textContent));

  return button;
};

const copyButton = createCopyButton();
codeContainer.style.position = "relative";
codeContainer.appendChild(copyButton);
