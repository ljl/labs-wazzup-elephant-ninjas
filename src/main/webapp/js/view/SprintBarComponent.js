if (!ui) {
    var ui = {};
}

ui.sprintBar = function () {
    var sprintBarEl = $('[data-component=sprint-bar]');

    this.update = function (data) {
        $(sprintBarEl).html('');
        data.forEach(function (element, index, array) {
            $(sprintBarEl).append('<div class="' +
                                  element.name +
                                  '" style="width: ' +
                                  element.progress +
                                  '%;">' +
                                  element.name +
                                  '</div>');
        });
    }
}