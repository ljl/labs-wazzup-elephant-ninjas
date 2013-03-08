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

    var me = this;
    this.configService;
    this.teamCityDao;
    this.youTrackDao;
    this.branchBarService;
    this.sprintBar;
    this.sprintPeriodBar;
    this.sprintBarService;
    this.gitHubCommits;
    this.branchBar;

    function configLoaded() {

        console.log( "getYouTrackCredentials", me.configService.getYouTrackCredentials() );

        me.teamCityDao = new wassup.TeamCityDao();
        me.teamCityDao.setTeamCityUrl(me.configService.getTeamCityUrl());

        me.branchBarService = new wassup.BranchBarService();
        me.branchBarService.setTeamCityDao(me.teamCityDao);
        me.branchBarService.setConfigService(me.configService);

        me.sprintBar = new ui.sprintBar();
        me.sprintPeriodBar = new ui.sprintPeriodBar();
        me.branchBar = new ui.branchBar();
        me.gitHubCommits = new ui.gitHubCommits();

        me.youTrackDao = new wassup.YouTrackDao();
        me.youTrackDao.setYouTrackUrl(me.configService.getYouTrackUrl());
        me.youTrackDao.setYouTrackCredentials(me.configService.getYouTrackCredentials());

        me.sprintBarService = new wassup.SprintBarService();
        me.sprintBarService.setYouTrackDao(me.youTrackDao);
        me.sprintBarService.setConfigService(me.configService);
    }

    this.init = function () {
        this.configService = new wassup.ConfigService();
        this.configService.loadConfig( configLoaded );
    }
}
