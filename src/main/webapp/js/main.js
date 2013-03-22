if (!wassup) {
    var wassup = {};
}

wassup.Main = function () {

    var worker;

    var sprintBar;
    var sprintPeriodBar;
    var branchBar;
    var gitHubCommits;

    var me = this;

    this.init = function () {

        // setup web worker
        worker = new Worker("js/request-worker.js");

        me.sprintBar = new ui.sprintBar();
        me.sprintPeriodBar = new ui.sprintPeriodBar();
        me.branchBar = new ui.branchBar();
        me.gitHubCommits = new ui.gitHubCommits();

        worker.onmessage = function (event) {
            if (event.data.type == "debug") {
                console.log(event.data.message);
            }
            else if (event.data.type == "branchBars") {

                me.branchBar.update(event.data.branchBars);
            }
            else if (event.data.type == "sprintTimeBar") {

                console.log("Received sprintTimeBar...");
                console.log(event.data.sprintTimeBar);

                me.sprintPeriodBar.update(event.data.sprintTimeBar)
                // TODO: update ui with event.data.sprintTimeBar
            }
            else if (event.data.type == "sprintBar") {
                console.log("Received sprintStatusBar...");
                console.log(event.data.sprintBar);
                // TODO: update ui with event.data.sprintStatusBar
                me.sprintBar.update(event.data.sprintBar);
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
