if (!ui) {
    var ui = {};
}

ui.branchBar = function () {
    var branchBarsEl = $('[data-component=branch-bars]');

    this.update = function (branchBars) {


        $(branchBarsEl).html('');

        branchBars.forEach(function (branchBar, index, array) {
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
                                   '<span class="message">' +
                                   branchBar.changes[0].message +
                                   '</span>' +
                                   '<span class="author">' +
                                   '</span>' +
                                   '</li>' +
                                   '</ul>' +
                                   '</div>');
        });
    }
}
