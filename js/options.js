// Saves options to chrome.storage
function save_options() {
    let val = $('select#country').val();
    chrome.storage.sync.set({
        lang: val
    }, function () {
        M.toast({html: 'Language saved!'})
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get(['lang'], function (result) {
        let lang = result.lang;
        console.log('Value currently is ' + result.lang);

        if (lang !== undefined) {
            $('select#country').val(lang);
            $('select').formSelect();
        }
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
//init select
$('select').formSelect();