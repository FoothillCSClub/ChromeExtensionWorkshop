document.onreadystatechange = function () {
	document.getElementById('findInput').addEventListener('change', setFindText(event.target.value));
	document.getElementById('replaceInput').addEventListener('change', setReplaceText(event.target.value));

	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		window.port = chrome.tabs.connect(tabs[0].id)
	})
}

function setFindText(str) {
	chrome.storage.local.set({ findText: str });
	chrome.runtime.sendMessage({ findText: str });
	try {
		window.port.postMessage({ findText: str });
	} catch (e) {}
}

function setReplaceText(str) {
	chrome.storage.local.set({ replaceText: str });
	chrome.runtime.sendMessage({ replaceText: str });
	try {
		window.port.postMessage({ replaceText: str });
	} catch (e) { }
}
