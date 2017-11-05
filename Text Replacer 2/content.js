var findText = '';
var replaceText = '';

chrome.runtime.sendMessage('tabLoad', response => {
	findText = response.findText;
	replaceText = response.replaceText;
	document.body.innerHTML = document.body.innerHTML
		.replace(new RegExp(findText[0].toUpperCase() + findText.slice(1), 'g'), replaceText[0].toUpperCase() + replaceText.slice(1))
		.replace(new RegExp(findText, 'gi'), replaceText);
});

chrome.runtime.onMessage.addListener(msg => {
	if (msg.findText)
		findText = msg.findText;
	else if (msg.replaceText)
		replaceText = msg.replaceText;
});
