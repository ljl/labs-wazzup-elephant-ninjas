var wassup = {};

self.onmessage = function (event) {


    wassup.fetch = function (url, data, callback) {

        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.setRequestHeader("Accept", "application/json");
        request.send(null);

        if (callback != null) {
            callback(request.response);
        }
        return JSON.parse(request.response);
    }

    wassup.fetchJsonSync = function (url, data, opts) {

        self.postMessage({
            type: "debug",
            message: "fetching json at url: " + url
        });

        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.setRequestHeader("Accept", "application/json");


        if (opts && opts.auth) {
            request.setRequestHeader('Authorization', make_base_auth(opts.user, opts.password));
        }
        request.send(null);
        return JSON.parse(request.response);
    }

    function make_base_auth(user, password) {
        var tok = user + ':' + password;
        var hash = Base64.encode(tok);
        return "Basic " + hash;
    }

    <!-- Controllers -->
    importScripts('lib/base64.js', 'lib/moment.js', 'ConfigService.js', 'BranchBarService.js', 'TeamCityDao.js', 'SprintBarService.js',
        'YouTrackDao.js');

    var configService = new wassup.ConfigService();
    configService.loadConfig();

    var teamCityDao = new wassup.TeamCityDao();
    teamCityDao.setTeamCityUrl(configService.getTeamCityUrl());

    var youTrackDao = new wassup.YouTrackDao();
    youTrackDao.setYouTrackUrl(configService.getYouTrackUrl());
    youTrackDao.setYouTrackCredentials(configService.getYouTrackCredentials());

    var branchBarService = new wassup.BranchBarService();
    branchBarService.setTeamCityDao(teamCityDao);
    branchBarService.setConfigService(configService);

    var sprintBarService = new wassup.SprintBarService();
    sprintBarService.setYouTrackDao(youTrackDao);

    runEveryXSeconds();
    setInterval(function () {
        runEveryXSeconds()
    }, 10000);


    function runEveryXSeconds() {

        var branchBars = branchBarService.getBranchBars();
        self.postMessage({ "branchBars": branchBars, "type": "branchBars"});

        var sprintTimeBar = sprintBarService.getSprintTimeBar();
        self.postMessage({ "sprintTimeBar": sprintTimeBar, "type": "sprintTimeBar"});

        var sprintBar = sprintBarService.getSprintBar();
        self.postMessage({"sprintBar": sprintBar, "type": "sprintBar"});

        // TODO: add code for retrieving  sprintStatusBar and postMessage with result
    }

};