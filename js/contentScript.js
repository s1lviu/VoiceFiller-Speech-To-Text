document.addEventListener('recognitionStarted', function (data) {
    chrome.runtime.sendMessage("recognitionStarted");
});

document.addEventListener("recognitionEnded", function (data) {
    chrome.runtime.sendMessage("recognitionEnded");
});