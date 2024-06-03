chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "translate",
    title: "Translate to Sinhala",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "translate") {
    const text = info.selectionText;
    if (text) {
      translateText(text, tab);
    }
  }
});

function translateText(text, tab) {
  const apiUrl = 'https://translation.api.url';
  const apiKey = 'API_KEY';

  fetch(`${apiUrl}?key=${apiKey}&text=${encodeURIComponent(text)}&to=si`, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(data => {
    const translatedText = data.translatedText || "Translation error";
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: showAlert,
      args: [translatedText]
    });
  })
  .catch(error => console.error('Error translating text:', error));
}

function showAlert(translatedText) {
  alert(`Translated text: ${translatedText}`);
}
