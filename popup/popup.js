const button = document.getElementById("test-button");
const status = document.getElementById("status");

button.addEventListener("click", () => {
    status.textContent = "Status: Button clicked";
});