const background = chrome.extension.getBackgroundPage();

document.onreadystatechange = function () {
	var findInput = document.getElementById('findInput');
	var replaceInput = document.getElementById('replaceInput');
	// Retrieve settings from Chrome storage
	chrome.storage.local.get(null, items => {
		findInput.value = items.findText || '';
		replaceInput.value = items.replaceText || '';
	});
	// Set up event listeners
	findInput.addEventListener('input', setFindText);
	replaceInput.addEventListener('input', setReplaceText);
}

function setFindText(e) {
	var str = e.target.value;
	console.log(str);
	// Store in Chrome storage
	chrome.storage.local.set({ findText: str });
	// Store in background script variables
	background.findText = str;
	// Pass to active tab
	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		chrome.tabs.sendMessage(tabs[0].id, { findText: str });
	});
}

function setReplaceText(e) {
	var str = e.target.value;
	console.log(str);
	// Store in Chrome storage
	chrome.storage.local.set({ replaceText: str });
	// Store in background script variables
	background.replaceText = str;
	// Pass to active tab
	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		chrome.tabs.sendMessage(tabs[0].id, { replaceText: str });
	});
}
