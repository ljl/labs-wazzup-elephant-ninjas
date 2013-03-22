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
                html += '<ul class="tests">';
                html += '<li class="status_' + branchBar.status + '">';
                html += branchBar.name + '</li>';

                if (branchBar.failedTestCount > 0) {
                    html +=
                    '<li class="failed">' + branchBar.failedTestCount + ' failed ' + ', ' + branchBar.passedTestCount + ' passed</li>';
                    html += '<li class="ignored">' + branchBar.ignoredTestCount + ' ignored</li>';
                }
                else {
                    html += '<li class="passed">' + branchBar.passedTestCount + ' passed</li>';
                    html += '<li class="ignored">' + branchBar.ignoredTestCount + ' ignored</li>';
                }

                if (branchBar.codeCoverage != undefined) {
                    html += '<li class="codeCoverage">' + branchBar.codeCoverage + '</li>';
                }
                else {
                    html += '<li class="codeCoverage">?</li>';
                }
                html += '<li class="changers">';
                html += '<img width="56" height="56" src="' + gravatarBase + gravatarHash + '"/>';
                html += '</li>';

                html += '<li class="changeMessages">';
                html += '<span class="message">' + branchBar.changes[0].message;
                html += '</span>';
                html += '</li>';

                html += '</ul>' +
                        '</div>';

                /*html += '<ul class="changes">' +
                 '<li>' +
                 '<img src="' + gravatarBase + gravatarHash + '"/>' +
                 '<span class="message">' +
                 branchBar.changes[0].message +
                 '</span>' +
                 '<span class="author">' +
                 '</span>' +
                 '</li>' +
                 '</ul>';*/

                html += '</div>';

                $(branchBarsEl).append(html);
            });
        } else {
            console.error("No branch bar found");
        }
    }
}
