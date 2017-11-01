var findText = '';
var replaceText = '';
chrome.storage.local.get(null, items => {
	findText = items.findText || '';
	replaceText = items.replaceText || '';
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg == 'findText')
		findText = msg.findText;
	else if (msg == 'replaceText')
		replaceText = msg.replaceText;
	else if (msg == 'tabLoad')
		sendResponse({
			findText,
			replaceText
		});
});
