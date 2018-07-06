var numbersOfRequest = [];

chrome.storage.local.get('numbersOfRequest', function (items) {
    var numbersOfRequestString = items.numbersOfRequest;
    numbersOfRequest = numbersOfRequestString.split(" ");

    if (numbersOfRequest.length > 0)
        startDownloading();
});

function startDownloading() {

    var changeEvt = document.createEvent("HTMLEvents");
    changeEvt.initEvent("change", true, true);

    var filterField = document.querySelector('.v-textfield');
    var updateButton = document.querySelectorAll('span.v-button-caption')[5];

    numbersOfRequestIndex = 0;
    delay_loop();

    function delay_loop() {

        setTimeout(function () {

            var currentValue = numbersOfRequest.splice(0, 1)[0];
            filterField.value = currentValue;
            filterField.dispatchEvent(changeEvt);

            updateButton.click();

            waitForEl('.v-table-row, .v-table-row-odd', currentValue, function () {

                document.querySelector('.v-link a').click();

                if (numbersOfRequest.length > 0) {
                    delay_loop();
                } else {

                    chrome.storage.local.remove('numbersOfRequest', function (items) {
                        console.log(items);
                    });                    
                    
                }
                    

            });

        }, 1000);
    }
}

function waitForEl(selector, currentValue, callback) {
    var rowLength = document.querySelectorAll(selector).length;
    var searchNumberText = document.querySelector('.v-table-row td:first-child div').innerText;

    if (rowLength == 1 && currentValue == searchNumberText) {
        callback();
    } else {
        setTimeout(function () {
            waitForEl(selector, currentValue, callback);
        }, 100);
    }
};

