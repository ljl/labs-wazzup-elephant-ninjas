if (!wassup) {
    var wassup = {};
}

wassup.fetch = function (url, data, callback) {

    //console.log("fetching url: ", url);

    return $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        async: true,
        timeout: 1000,
        success: callback,
        error: function () {
            console.log(arguments);
        }
    });
}

wassup.fetchJsonSync = function (url, data, callback) {

    //console.log("fetching url: ", url);

    return $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        async: false,
        timeout: 1000,
        success: callback,
        error: function () {
            console.log(arguments);
        }
    });
}

wassup.Main = function () {

    var worker;

    this.init = function () {

        // setup web worker
        worker = new Worker("js/request-worker.js");

        worker.onmessage = function (event) {
            if (event.data.type == "debug") {
                console.log(event.data.message);
            }
            else if (event.data.type = "branchBars") {
                console.log("Received branchBars...");
                console.log(event.data.branchBars);
                // TODO: update ui with event.data.branchBars
            }
            else if (event.data.type = "sprintTimeBar") {
                console.log("Received sprintTimeBar...");
                console.log(event.data.sprintTimeBar);
                // TODO: update ui with event.data.sprintTimeBar
            }
            else if (event.data.type = "sprintStatusBar") {
                console.log("Received sprintStatusBar...");
                console.log(event.data.sprintStatusBar);
                // TODO: update ui with event.data.sprintStatusBar
            }
        }
    }

    this.startAutomagicUpdate = function () {

        console.log("main.startAutomagicUpdate");

        worker.postMessage({
            "functionToExecute": "start"
        });
    }
}
