var findText = '';
var replaceText = '';

chrome.runtime.sendMessage('tabLoad', response => {
	findText = response.findText;
	replaceText = response.replaceText;
});

chrome.runtime.onConnect.addListener(msg => {
	if (msg.findText)
		findText = msg.findText;
	else if (msg.replaceText)
		replaceText = msg.replaceText;
});

document.body.innerHTML = document.body.innerHTML
	.replace(new RegExp(findText[0].toUpperCase() + findText.slice(1), 'g'), replaceText)
	.replace(new RegExp(findText, 'gi'), replaceText);
