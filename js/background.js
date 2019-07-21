async function getSavedLanguage() {
    let data = await chrome.storage.sync.get('lang');
    return data.lang;
}


//open tutorial after installing
chrome.runtime.onInstalled.addListener(function (object) {
    chrome.tabs.create({url: "https://silviustroe.com/contact/"});
});

/*chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    chrome.browserAction.setIcon({
        path: "icons/favicon-32x32.png"
    });
    chrome.browserAction.setBadgeText({
        text: ''
    });
});*/


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message === "recognitionEnded") {
        chrome.browserAction.setIcon({
            path: "icons/favicon-32x32.png"
        });
        chrome.browserAction.setBadgeText({
            text: ''
        });
    } else {
        chrome.browserAction.setIcon({
            path: "icons/recording.png"
        });
        chrome.browserAction.setBadgeText({
            text: 'REC'
        });
    }
});


let currentTabId;
chrome.commands.onCommand.addListener(async function (command) {
    var config = {
        lang: await getSavedLanguage() || 'en-US'
    };
    chrome.tabs.executeScript(null, {
        code: 'var config = ' + JSON.stringify(config)
    }, function () {
        chrome.tabs.executeScript(null, {file: 'js/recognition.js'});
    });


    let getTabs = await chrome.tabs.query({active: true, currentWindow: true});
    let currentTab = getTabs[0];
    currentTabId = currentTab.id;

});

chrome.tabs.onUpdated.addListener(async function (updatedTabId) {
    if (updatedTabId === currentTabId) {
        chrome.browserAction.setIcon({
            path: "icons/favicon-32x32.png"
        });
        chrome.browserAction.setBadgeText({
            text: ''
        });
    }
});