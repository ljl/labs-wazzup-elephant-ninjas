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

    var me = this;
    var autoMagicReloadInterval = 1000;
    var reloadIntervalId;

    var worker;

    this.configService;
    this.teamCityDao;
    this.youTrackDao;
    this.branchBarService;
    this.sprintBar;
    this.sprintPeriodBar;
    this.sprintBarService;
    this.gitHubCommits;
    this.branchBar;

    function configLoaded() {

        console.log("config loaded");


        me.teamCityDao = new wassup.TeamCityDao();
        me.teamCityDao.setTeamCityUrl(me.configService.getTeamCityUrl());

        me.branchBarService = new wassup.BranchBarService();
        me.branchBarService.setTeamCityDao(me.teamCityDao);
        me.branchBarService.setConfigService(me.configService);

        me.sprintBar = new ui.sprintBar();
        me.sprintPeriodBar = new ui.sprintPeriodBar();
        me.branchBar = new ui.branchBar();
        me.gitHubCommits = new ui.gitHubCommits();

        me.youTrackDao = new wassup.YouTrackDao();
        me.youTrackDao.setYouTrackUrl(me.configService.getYouTrackUrl());
        me.youTrackDao.setYouTrackCredentials(me.configService.getYouTrackCredentials());

        me.sprintBarService = new wassup.SprintBarService();
        me.sprintBarService.setYouTrackDao(me.youTrackDao);
        me.sprintBarService.setConfigService(me.configService);

        console.log("everything setup");
    }

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
                //other types of data
            }
        }
    }

    this.reload = function () {

        console.log("main.reload");

        //main.sprintBar.update(data);

        var branchBar = me.branchBarService.getBranchBar("5.0");
        me.branchBar.update(branchBar);
    }

    this.startAutomagicUpdate = function () {

        console.log("main.startAutomagicUpdate");

        worker.postMessage({
            "functionToExecute": "start"
        });

        //setTimeout(function () {
        //    me.reload();
        //}, autoMagicReloadInterval);
        /*(function loop() {
         reloadIntervalId = setTimeout(function () {
         me.reload();
         loop();
         }, autoMagicReloadInterval);
         })();*/

    }
}
