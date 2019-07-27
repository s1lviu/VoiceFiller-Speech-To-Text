let version = chrome.runtime.getManifest().version;

let paragraph = document.getElementById("version");
let text = document.createTextNode(version + ' alpha');
paragraph.appendChild(text);


document.getElementById("options").addEventListener("click", function () {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});

document.getElementById("poweredBy").addEventListener("click", function (e) {
    e = e || window.event;
    let target = e.target || e.srcElement,
        link = target.href;
    if (link !== undefined)
        chrome.tabs.create({url: link});
}, false);


chrome.storage.sync.get(['lang'], function (result) {
    let lang = result.lang;
    if (lang) {
        let opts = document.getElementById("options");
        let child = document.createElement("p");
        child.innerHTML = '<b>Congratulations! Language is set to ' + lang + '</b>';
        opts.after(child);
    }
});