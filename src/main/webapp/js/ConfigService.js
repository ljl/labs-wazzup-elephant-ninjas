if (!wassup) {
    var wassup = {};
}

wassup.ConfigService = function () {

    var thisService = this;

    // cached config
    var config;

    this.getTeamCityUrl = function () {

        // TODO: resolve from config.json
        return "http://teamcity.enonic.net/";
    };

    this.loadConfig = function () {
        $.getJSON('js/config.json', function (configObj) {
            config = configObj;
        });
    }

    this.getBranchConfigNames = function () {

        var branchesArray = config.branches;
        var branchNames = [];
        jQuery.each(branchesArray, function (index) {
            var branch = branchesArray[index];
            branchNames.push(branch.name);
        });
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

    this.getYouTrackUrl = function () {

        // TODO: resolve from config.json
        return "https://youtrack.enonic.net/";
    }

    this.getSprintConfig = function () {

        // TODO: resolve from config.json
        return {
            "youTrack": "http://youtrack.enonic.net/"
        };
    };
}