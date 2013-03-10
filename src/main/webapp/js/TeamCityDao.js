wassup.TeamCityDao = function () {

    var teamCityUrl;
    var restUrl;

    this.setTeamCityUrl = function (value) {
        teamCityUrl = value;
        restUrl = teamCityUrl + "guestAuth/app/rest/";
    }

    this.getBuild = function (buildTypeId) {
        var url = restUrl + "builds/buildType:(" + buildTypeId + ")";
        return wassup.fetchJsonSync(url, {});
    };

    this.getBuildStatistics = function (buildTypeId) {
        var url = restUrl + "builds/buildType:(" + buildTypeId + ")/statistics";
        return wassup.fetchJsonSync(url, {});
    };

    this.getChanges = function (changeId) {
        var url = restUrl + "changes/id:" + changeId;
        return wassup.fetchJsonSync(url, {});
    };

    this.get = function (restUrl) {
        var url = teamCityUrl + restUrl;
        return wassup.fetchJsonSync(url, {});
    };
}