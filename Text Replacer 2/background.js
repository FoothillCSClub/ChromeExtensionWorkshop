var findText = '';
var replaceText = '';
chrome.storage.local.get(null, items => {
	findText = items.findText || '';
	replaceText = items.replaceText || '';
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg == 'tabLoad')
		sendResponse({
			findText,
			replaceText
		});
});
