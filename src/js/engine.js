
chrome.tabs.query({}, function(tabs) {
    tabs.forEach((tab) => {
        console.log("Aba:", tab.title, tab.url);
    });
});
