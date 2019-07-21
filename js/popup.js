let version = chrome.runtime.getManifest().version;
$("#version").append(version + ' alpha');
$("#options").click(function () {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});
$('#poweredBy').on('click', 'a', function () {
    chrome.tabs.create({url: $(this).attr('href')});
    return false;
});


chrome.storage.sync.get(['lang'], function (result) {
    let lang = result.lang;
    if (lang) {
        $('#options').after('<br><b>Congratulations! Language is set to ' + lang + '</b>');
    }
});