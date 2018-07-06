function startDownloadPage() {
  chrome.tabs.executeScript({
    file: 'scripts/injectModules/downloadPageScript.js'
  });
}

function startDownloadByCadastrals() {
  
  var numbersOfRequestString = document.getElementById('number-of-request-data').value;
  
  chrome.storage.local.set({
    numbersOfRequest: numbersOfRequestString
  }, function () {
    chrome.tabs.executeScript({
      file: "scripts/injectModules/downloadByCadastrals.js"
    });
  });
}



document.getElementById('downloadPage').addEventListener('click', startDownloadPage);

document.getElementById('download').addEventListener('click', startDownloadByCadastrals);