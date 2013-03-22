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
        var build;
        var buildStatistics;
        var changeIds = [];

        self.postMessage({
            type: "debug",
            message: {"branchConfig": branchConfig}
        });

        build = teamCityDao.getBuild(branchConfig.teamCity.buildTypeId);
        /*self.postMessage({
         type: "debug",
         message: {"build" : build}
         });*/

        branchBar.name = name;
        branchBar.status = build.status;

        buildStatistics = teamCityDao.getBuildStatistics(branchConfig.teamCity.buildTypeId);
        /*self.postMessage({
         type: "debug",
         message: {"buildStatistics" : buildStatistics}
         });*/

        for (var index in buildStatistics.property) {
            var prop = buildStatistics.property[index];

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
        if (branchBar.failedTestCount == undefined) {
            branchBar.failedTestCount = 0;
        }

        var changesRefJson = teamCityDao.get(build.changes.href);

        for (index in changesRefJson.change) {
            changeIds.push(changesRefJson.change[index].id);

            var tcChangeJson = teamCityDao.getChanges(changesRefJson.change[index].id);
            branchBar.changes = [];
            var change = {
                "message": tcChangeJson.comment,
                "username": tcChangeJson.username
            };

            branchBar.changes.push(change);
        }
        return branchBar;
    };
}