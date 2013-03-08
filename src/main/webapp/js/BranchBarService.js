if (!wassup) {
    var wassup = {};
}

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

    this.getBranchBars = function (callback) {

        var branchNames = configService.getBranchConfigNames();
        console.log("getBranchBars branchNames: ", branchNames);

        var branchBars = [];

        var asyncMethods = [];

        for (var i in branchNames) {
            var branchName = branchNames[i];
            //asyncMethods.push(thisService.getBranchBar(branchName));
        }

        const branchName2 = branchNames[0];
        asyncMethods.push(thisService.getBranchBar(branchName2));

        console.log("asyncMethods", asyncMethods);

        $.when.apply($, asyncMethods).done(function (json) {

            console.log("getBranchBars json", json);
//            for (j in arguments) {
//                var arg = arguments[j];
//                console.log("arg", arg);
//                for (k in arg) {
//                    var result = arg[k];
//
//                    console.log("result", result);
//                    console.log("result.responseText", result.responseText);
//                }
//            }
        });

        //callback(branchBars);
    }

    this.getBranchBar = function (name, callback) {

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