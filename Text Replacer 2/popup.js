const background = chrome.extension.getBackgroundPage();

document.onreadystatechange = function () {
	var findInput = document.getElementById('findInput');
	var replaceInput = document.getElementById('replaceInput');
	chrome.storage.local.get(null, items => {
		findInput.value = items.findText || '';
		replaceInput.value = items.replaceText || '';
	});
	findInput.addEventListener('input', setFindText);
	replaceInput.addEventListener('input', setReplaceText);
}

function setFindText(e) {
	var str = e.target.value;
	console.log(str);
	chrome.storage.local.set({ findText: str });
	background.findText = str;
	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		chrome.tabs.sendMessage(tabs[0].id, { findText: str });
	});
}

function setReplaceText(e) {
	var str = e.target.value;
	chrome.storage.local.set({ replaceText: str });
	background.replaceText = str;
	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		chrome.tabs.sendMessage(tabs[0].id, { replaceText: str });
	});
}
