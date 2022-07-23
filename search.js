function getSelectedText(tab, callbackFunction) {
    var req_id = Math.random();
    function listener(message, sender, sendResponse) {
        if (message['id'] === req_id) {
            callbackFunction(message['selection']);
            browser.runtime.onMessage.removeEventListener(listener);
        }
    }
    browser.runtime.onMessage.addEventListener(listener);
    browser.tabs.executeScript(tab.id, {
        code: 'var getSel = function(doc){var a = doc.activeElement; try{if(a && a.contentDocument && (frameSel = getSel(a.contentDocument), frameSel != \'\' && frameSel.length)){return frameSel;}}catch(e){}; try{if(a.selectionStart != undefined && a.value && a.type != \'password\'){return a.value.substring(a.selectionStart, a.selectionEnd);}} catch(e){}; return doc.getSelection().toString();}; browser.runtime.sendMessage({\'selection\': getSel(document), id: ' + req_id + '});'
    }).catch(e => {
        browser.runtime.onMessage.removeEventListener(listener);
        callbackFunction('');
    });
}

function search(args) {
    args.searchTerms = args.searchTerms.trim();
    const url = 'https://www.google.com/search?q=site:reddit.com+';
    browser.runtime.getBrowserInfo().then(browserInfo => {
        params = {
            'url': url,
            'active': true
        };
        if (browserInfo.name !== 'Fennec') {
            params.openerTabId = args.openerTab.id;
        }
        browser.tabs.create(params, function (newTab) {
            browser.tabs.executeScript(newTab.id, {file: 'contentScript.js'});
            resolve();
        });
    });
}