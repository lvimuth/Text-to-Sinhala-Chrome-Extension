document.getElementById('translateButton').addEventListener('click', () => {
  chrome.tabs.executeScript({
    code: 'window.getSelection().toString();'
  }, (selection) => {
    chrome.runtime.sendMessage({ text: selection[0] });
  });
});
