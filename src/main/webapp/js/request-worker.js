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

        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.setRequestHeader("Accept", "application/json");
        request.send(null);
        if (opts && opts.auth) {
            request.setRequestHeader('Authorization', make_base_auth(opts.user, opts.password));
        }

        return JSON.parse(request.response);
    }

    function make_base_auth(user, password) {
        var tok = user + ':' + password;
        var hash = btoa(tok);
        return "Basic " + hash;
    }

    <!-- Controllers -->
    importScripts('ConfigService.js', 'BranchBarService.js', 'TeamCityDao.js', 'SprintBarService.js', 'YouTrackDao.js');

    var configService = new wassup.ConfigService();
    configService.loadConfig();

    var teamCityDao = new wassup.TeamCityDao();
    teamCityDao.setTeamCityUrl(configService.getTeamCityUrl());

    var branchBarService = new wassup.BranchBarService();
    branchBarService.setTeamCityDao(teamCityDao);
    branchBarService.setConfigService(configService);

    setInterval(function () {
        runEveryXSeconds()
    }, 5000);

    function runEveryXSeconds() {

        var branchBars = branchBarService.getBranchBars();
        var message = { "branchBars": branchBars};
        self.postMessage(message);

        // TODO: add code for retrieving sprintTimeBar and postMessage with result
        // TODO: add code for retrieving  sprintStatusBar and postMessage with result
    }

};