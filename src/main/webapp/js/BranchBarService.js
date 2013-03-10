
wassup.BranchBarService = function () {

    var thisService = this;

    var configService;

    var teamCityDao;

    this.setTeamCityDao = function (value) {
        teamCityDao = value;
    }

    this.setConfigService = function (value) {
        configService = value;
    }

    this.getBranchBars = function () {

        var branchNames = configService.getBranchConfigNames();

        var branchBars = [];

        for (var i in branchNames) {
            var branchName = branchNames[i];
            branchBars.push( this.getBranchBar(branchName) );
        }
        return branchBars;
    }

    this.getBranchBar = function (name) {

        var branchBar = {};

        var branchConfig = configService.getBranchConfig(name);
        var buildJson;
        var buildStatistics;
        var changeIds = [];

        //console.log( "getBranchBar branchConfig: ", branchConfig );

        buildJson = teamCityDao.getBuild(branchConfig.teamCity.buildTypeId);
        //console.log(" getBranchBar buildJson: ", buildJson);

        branchBar.name = name;
        branchBar.status = buildJson.status;

        buildStatistics = teamCityDao.getBuildStatistics(branchConfig.teamCity.buildTypeId);

        //console.log("getBranchBar buildStatistics: ", buildStatistics);

        branchBar.passedTestCount = buildStatistics.property[7].value;
        branchBar.failedTestCount = buildStatistics.property[5].value;
        branchBar.ignoredTestCount = buildStatistics.property[6].value;

        var changesRefJson = teamCityDao.get(buildJson.changes.href);

        for (var index in changesRefJson.change) {
            changeIds.push(changesRefJson.change[index].id);

            var tcChangeJson = teamCityDao.getChanges(changesRefJson.change[index].id);
            //console.log("getBranchBar change", tcChangeJson);
            branchBar.changes = [];
            var change = {
                "message": tcChangeJson.comment,
                "username": tcChangeJson.username
            };

            branchBar.changes.push(change);

            //console.log("returned branchBar", branchBar);
        }
        return branchBar;
    };

    this.getBranchBar2 = function (name, callback) {

        var branchBar = {};

        var branchConfig = configService.getBranchConfig(name);
        var build;
        var buildStatistics;
        var changeIds = [];

        //console.log( "getBranchBar branchConfig: ", branchConfig );

        var getBuildCall = teamCityDao.getBuild(branchConfig.teamCity.buildTypeId);
        return $.when(getBuildCall).done(function (json) {
            build = json;
            console.log(" getBranchBar build: ", build);

            branchBar.name = name;
            branchBar.status = build.status;

            var getBuildStatisticsCall = teamCityDao.getBuildStatistics(branchConfig.teamCity.buildTypeId);
            return $.when(getBuildStatisticsCall).done(function (json) {

                buildStatistics = json;
                //console.log("getBranchBar buildStatistics: ", buildStatistics);

                branchBar.passedTestCount = buildStatistics.property[7].value;
                branchBar.failedTestCount = buildStatistics.property[5].value;
                branchBar.ignoredTestCount = buildStatistics.property[6].value;

                return $.when(teamCityDao.get(build.changes.href)).done(function (json) {

                    var changesCalls = [];
                    for (var index in json.change) {
                        changeIds.push(json.change[index].id);

                        changesCalls.push(teamCityDao.getChanges(json.change[index].id));
                    }

                    return $.when.apply($, changesCalls).done(function (json) {
                        console.log("getBranchBar change", json);

                        branchBar.changes = [];
                        var change = {
                            "message": json.comment,
                            "username": json.username
                        };

                        branchBar.changes.push(change);

                        console.log("returned branchBar", branchBar);


                        if (callback) {
                            callback(branchBar);
                        }
                        return branchBar;
                    });
                });
            });
        });
    };
}