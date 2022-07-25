let tab;
let inputbox = document.getElementById('inputBox');

document.getElementById('inputForm').addEventListener('submit', function(e) {
    e.preventDefault();
    search({searchTerms: inputbox.value, openerTab: tab}).then(window.close);
});

browser.tabs.query({currentWindow: true, active: true}).then(tabs => {
    tab = tabs[0];
    getSelectedText(tab, function(selection) {
        if (inputbox.value == '') {
            inputbox.value = selection;
            inputbox.select();
        }
    });
});