if (!ui) {
    var ui = {};
}

ui.branchBar = function () {
    var branchBarsEl = $('[data-component=branch-bars]');

    this.update = function (data) {
        $(branchBarsEl).html('');
        $(branchBarsEl).append('<div class="bar">' +
                              '<div class="head">' +
                              '<div class="status">' +
                              data.name +
                              '</div>' +
                              '<ul class="tests">' +
                              '<li class="passed">' + data.passedTestCount + '</li>' +
                              '<li class="failed">' + data.failedTestCount + '</li>' +
                              '<li class="ignored">' + data.ignoredTestCount + '</li>' +
                              '</ul>' +
                              '</div>' +
                              '<ul class="changes">' +
                              '<li>' +
                              '<span class="message">' +
                              data.changes[0].message +
                              '</span>' +
                              '<span class="author">' +
                              '</span>' +
                              '</li>' +
                              '</ul>' +
                              '</div>');
    }
}
