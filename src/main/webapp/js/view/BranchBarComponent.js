if (!ui) {
    var ui = {};
}

ui.branchBar = function () {
    var branchBarsEl = $('[data-component=branch-bars]');

    this.update = function (branchBars) {
        if (branchBars) {
            $(branchBarsEl).html('');

            branchBars.forEach(function (branchBar, index, array) {
                var gravatarHash = md5(branchBar.changes[0].username + "@enonic.com");
                var gravatarBase = "http://www.gravatar.com/avatar/";
                $(branchBarsEl).append('<div class="bar">' +
                                       '<div class="head">' +
                                       '<div class="status">' +
                                       branchBar.name +
                                       '</div>' +
                                       '<ul class="tests">' +
                                       '<li class="passed">' + branchBar.passedTestCount + '</li>' +
                                       '<li class="failed">' + branchBar.failedTestCount + '</li>' +
                                       '<li class="ignored">' + branchBar.ignoredTestCount + '</li>' +
                                       '</ul>' +
                                       '</div>' +
                                       '<ul class="changes">' +
                                       '<li>' +
                                       '<img src="' + gravatarBase + gravatarHash + '"/>' +
                                       '<span class="message">' +
                                       branchBar.changes[0].message +
                                       '</span>' +
                                       '<span class="author">' +
                                       '</span>' +
                                       '</li>' +
                                       '</ul>' +
                                       '</div>');
            });
        } else {
            console.error("No branch bar found");
        }
    }
}
