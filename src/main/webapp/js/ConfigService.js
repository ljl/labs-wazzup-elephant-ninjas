wassup.ConfigService = function () {

    var config;

    var youTrackCredentials;

    this.getTeamCityUrl = function () {
        return config.teamCity;
    };

    this.getYouTrackUrl = function () {
        return config.youTrack;
    };

    this.getYouTrackCredentials = function () {
        return youTrackCredentials;
    };

    this.loadConfig = function () {
        config = wassup.fetchJsonSync('config.json');
        youTrackCredentials = wassup.fetchJsonSync('youtrack.credentials');
    }

    this.getBranchConfigNames = function () {
        var branchNames = [];

        for( var index in config.branches ) {
            var branch = config.branches[index];
            branchNames.push(branch.name);
        }
        return branchNames;
    };

    this.getBranchConfig = function (name) {

        for (var index in config.branches) {
            var branch = config.branches[index];
            if (branch.name === name) {
                return branch;
            }
        }
        return null;
    };



}