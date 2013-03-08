if (!wassup) {
    var wassup = {};
}

wassup.ConfigService = function () {

    var thisService = this;

    // cached config
    var config;
    var youTrackCredentials;

    this.getTeamCityUrl = function () {

        // TODO: resolve from config.json
        return "http://teamcity.enonic.net/";
    };

    this.loadConfig = function (callback) {

        return $.when(wassup.fetch('js/config.json')).
            done(function (json) {

                config = json;

                return $.when(wassup.fetch('js/youtrack.credentials')).
                    done(function (json) {

                        youTrackCredentials = json;

                        callback();
                    });
            }
        )

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

    this.getYouTrackCredentials = function () {
        return youTrackCredentials;
    }

    this.getSprintConfig = function () {

        // TODO: resolve from config.json
        return {
            "youTrack": "http://youtrack.enonic.net/"
        };
    };
}