function search(args) {
    args.searchTerms = args.searchTerms.trim();
    let url = 'https://www.google.com/search?q=site:reddit.com+';
    let terms = document.getElementById('inputBox').value
    terms = encodeURIComponent(terms)
    url = url + terms;
    browser.runtime.getBrowserInfo().then(browserInfo => {
        params = {
            'url': url,
            'active': true
        };
        if (browserInfo.name !== 'Fennec') {
            params.openerTabId = args.openerTab.id;
        }
        browser.tabs.create(params, function (newTab) {
            browser.tabs.executeScript(newTab.id, {file: 'tabPlacer.js'});
            resolve();
        });
    });
}