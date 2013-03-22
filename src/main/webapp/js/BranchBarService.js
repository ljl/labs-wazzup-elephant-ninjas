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
}