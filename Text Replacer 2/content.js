var findText = '';
var replaceText = '';

// Request settings from background script on load
chrome.runtime.sendMessage('tabLoad', response => {
	findText = response.findText;
	replaceText = response.replaceText;
	// This is an unsafe solution for text replacement, but is used here for brevity.
	document.body.innerHTML = document.body.innerHTML
		.replace(new RegExp(findText[0].toUpperCase() + findText.slice(1), 'g'), replaceText[0].toUpperCase() + replaceText.slice(1))
		.replace(new RegExp(findText, 'gi'), replaceText);
});

// Listen for settings changes from popup
chrome.runtime.onMessage.addListener(msg => {
	if (msg.findText)
		findText = msg.findText;
	else if (msg.replaceText)
		replaceText = msg.replaceText;
});
