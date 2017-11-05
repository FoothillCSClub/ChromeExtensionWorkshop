var findText = '';
var replaceText = '';
// Retrieve settings from Chrome storage
chrome.storage.local.get(null, items => {
	findText = items.findText || '';
	replaceText = items.replaceText || '';
});

// Listen for requests from content script
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg == 'tabLoad')
		sendResponse({
			findText,
			replaceText
		});
});
