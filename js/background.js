/*
 * Copyright (c) 2019.  Silviu Stroe
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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