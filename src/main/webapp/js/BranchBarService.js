wassup.BranchBarService = function () {

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
            branchBars.push(this.getBranchBar(branchName));
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


        //branchBar.passedTestCount = buildStatistics.property[15].value;
        for (var index in buildStatistics.property) {
            var prop = buildStatistics.property[index];

            self.postMessage({
                type: "debug",
                message: prop.name + ": " + prop.value
            });

            if (prop.name == "PassedTestCount") {
                branchBar.passedTestCount = prop.value;
            }
            else if (prop.name == "IgnoredTestCount") {
                branchBar.ignoredTestCount = prop.value;
            }
            else if (prop.name == "FailedTestCount") {
                branchBar.failedTestCount = prop.value;
            }
        }

        var changesRefJson = teamCityDao.get(buildJson.changes.href);

        for (index in changesRefJson.change) {
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
}