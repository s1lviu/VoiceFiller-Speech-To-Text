// Saves options to chrome.storage
function save_options() {
    let val = document.querySelector("select#country").value;
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
        if (lang !== undefined) {
            document.querySelector("select#country").value = lang;
            let elems = document.querySelectorAll('select');
            let instances = M.FormSelect.init(elems);
        }
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
//init select
document.addEventListener('DOMContentLoaded', function () {
    let elems = document.querySelectorAll('select');
    let instances = M.FormSelect.init(elems);
});
