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
                var html = '<div class="bar">' +
                           '<div class="head">';
                html += '<div class="status_' + branchBar.status + '">';
                html += branchBar.name +
                        '</div>';
                html += '<ul class="tests">';
                if (branchBar.failedTestCount > 0) {
                    html += '<li class="failed">' + branchBar.failedTestCount + '</li>';
                    html += '<li class="passed">' + branchBar.passedTestCount + '</li>';
                    html += '<li class="ignored">' + branchBar.ignoredTestCount + '</li>';
                }
                else {
                    html += '<li class="passed">' + branchBar.passedTestCount + '</li>';
                    html += '<li class="ignored">' + branchBar.ignoredTestCount + '</li>';
                }

                if (branchBar.codeCoverage != undefined) {
                    html += '<li class="codeCoverage">' + branchBar.codeCoverage + '</li>';
                }
                html += '</ul>' +
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
                        '</div>';

                $(branchBarsEl).append(html);
            });
        } else {
            console.error("No branch bar found");
        }
    }
}
