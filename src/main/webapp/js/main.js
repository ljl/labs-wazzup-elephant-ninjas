if (!wassup) {
    var wassup = {};
}

wassup.fetch = function (url, data, callback) {

    //console.log("fetching url: ", url);

    return $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        timeout: 5000,
        success: callback,
        error: function () {
            console.log(arguments);
        }
    });
}

wassup.Main = function () {

    this.configService;
    this.teamCityDao;
    this.youTrackDao;
    this.branchBarService;
    this.sprintBar;
    this.sprintPeriodBar;
    this.sprintBarService;
    this.gitHubCommits;
    this.branchBar;


    this.init = function () {

        this.configService = new wassup.ConfigService();
        this.configService.loadConfig();

        this.teamCityDao = new wassup.TeamCityDao();
        this.teamCityDao.setTeamCityUrl(this.configService.getTeamCityUrl());

        this.branchBarService = new wassup.BranchBarService();
        this.branchBarService.setTeamCityDao(this.teamCityDao);
        this.branchBarService.setConfigService(this.configService);

        this.sprintBar = new ui.sprintBar();
        this.sprintPeriodBar = new ui.sprintPeriodBar();
        this.branchBar = new ui.branchBar();
        this.gitHubCommits = new ui.gitHubCommits();

        this.youTrackDao = new wassup.YouTrackDao();
        this.youTrackDao.setYouTrackUrl(this.configService.getYouTrackUrl());

        this.sprintBarService = new wassup.SprintBarService();
        this.sprintBarService.setYouTrackDao(this.youTrackDao);
        this.sprintBarService.setConfigService(this.configService);
    }
}
