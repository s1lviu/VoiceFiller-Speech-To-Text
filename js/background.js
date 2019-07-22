async function getSavedLanguage() {
    let data = await chrome.storage.sync.get('lang');
    return data.lang;
}

function resetIcon() {
    chrome.browserAction.setIcon({
        path: "icons/favicon-32x32.png"
    });
    chrome.browserAction.setBadgeText({
        text: ''
    });
}

function enableRecIcon() {
    chrome.browserAction.setIcon({
        path: "icons/recording.png"
    });
    chrome.browserAction.setBadgeText({
        text: 'REC'
    });
}

//open tutorial after installing
chrome.runtime.onInstalled.addListener(function (object) {
    chrome.tabs.create({url: "https://silviustroe.com/contact/"});
});


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message === "recognitionEnded") {
        resetIcon();
    } else {
        enableRecIcon();
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

chrome.tabs.onRemoved.addListener(function (tabid, removed) {
    if (tabid === currentTabId) {
        resetIcon();
    }
});

chrome.tabs.onUpdated.addListener(async function (updatedTabId) {
    if (updatedTabId === currentTabId) {
        resetIcon();
    }

});