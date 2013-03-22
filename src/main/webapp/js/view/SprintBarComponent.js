if (!ui) {
    var ui = {};
}

var minFullTextWidths = {
    "Open": 10,
    "In Progress": 15,
    "Pull Request": 20,
    "Verified": 15,
    "Fixed": 15
};

ui.sprintBar = function () {
    var sprintBarEl = $('[data-component=sprint-bar]');

    this.update = function (data) {
        $(sprintBarEl).html('');
        $.each(data, function (stateId, stateValue) {
            $(sprintBarEl).append('<div class="' +
                                  toClassName(stateId) +
                                  '" style="width: ' +
                                  stateValue.percent +
                                  '%;"><br/>' +
                                  getStateTitle(stateId, stateValue) +
                                  '</div>');
        });
    }

    function toClassName(str) {
        return str.toLowerCase().replace(" ", '-');

    };

    function getStateTitle(stateId, stateValue) {
        var minFullTextWidth = minFullTextWidths[stateId];
        return stateValue.percent >= minFullTextWidth ? stateValue.count + ' ' + stateId : stateValue.count;
    }

}