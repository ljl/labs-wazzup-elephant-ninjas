if (!wassup) {
    var wassup = {};
}

wassup.TeamCityDao = function () {

    var thisDao = this;
    var teamCityUrl;
    var restUrl;

    this.setTeamCityUrl = function (value) {
        teamCityUrl = value;
        restUrl = teamCityUrl + "guestAuth/app/rest/";
    }

    this.getBuild = function (buildTypeId) {
        var url = restUrl + "builds/buildType:(" + buildTypeId + ")";
        return wassup.fetch(url, {});
    };

    this.getBuildStatistics = function (buildTypeId) {
        var url = restUrl + "builds/buildType:(" + buildTypeId + ")/statistics";
        return wassup.fetch(url, {});
    };

    this.getChanges = function (changeId) {
        var url = restUrl + "changes/id:" + changeId;
        return wassup.fetch(url, {});
    };

    this.get = function (restUrl) {
        var url = teamCityUrl + restUrl;
        return wassup.fetch(url, {});
    };
}