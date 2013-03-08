if (!ui) {
    var ui = {};
}

ui.sprintPeriodBar = function () {
    var sprintPeriodBarEl = $('[data-component=sprint-period-bar]');

    this.update = function (sprintData) {
        var startText = sprintData.startDate.format('DD MMMM');
        var endText = sprintData.finishDate.format('DD MMMM');
        $(sprintPeriodBarEl).empty();
        var bar = $('<div/>').addClass('sprint-period-bar');
        bar.append($('<span>/>').text(startText).css('float', 'left'));
        bar.append($('<span>/>').text(sprintData.name).css('position', 'absolute').css('left', '50%').css('right', '50%').css('white-space', 'nowrap') );
        bar.append($('<span>/>').text(endText).css('float', 'right'));
        $(sprintPeriodBarEl).append(bar);
    }
}