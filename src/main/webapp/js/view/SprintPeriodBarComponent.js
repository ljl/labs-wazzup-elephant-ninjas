if (!ui) {
    var ui = {};
}

ui.makeDonut = function (percentage, selector) {
    var colors = ['green', 'yellow', 'red']
        , segmentSize = 100.0 / colors.length;
    colors.push(colors[colors.length - 1]);
    var componentSelector = selector || '.donut-arrow';
    $(componentSelector).each(function () {
        var $this = $(this)
            , percent = percentage || (+$this.data('percentage') );

        if (percent > 100) {
            percent = 100;
        }
        else if (percent < 0) {
            percent = 0;
        }

        $this.css('transform', 'rotate(' + ((1.8 * percent) - 90) + 'deg)');

        // remove assigned color before assigning new color
        var parent = $this.parent();
        $.each(colors, function (i, col) {
            parent.removeClass(col)
        });

        $this.parent().addClass(colors[Math.floor(percent / segmentSize)]);
    });
}

ui.sprintPeriodBar = function () {
    var sprintPeriodBarEl = $('[data-component=sprint-period-bar]');

    this.update = function (sprintData) {
        var startText = sprintData.startDate.format('DD MMMM');
        var endText = sprintData.finishDate.format('DD MMMM');
        var progWidth = (sprintData.progress*100).toFixed(2);
        var daysLeft = sprintData.daysReamining;

        $('#sprintDaysRemainingText').text(daysLeft);
//        $('#donutSprintRemaining').attr('data-percentage', progWidth);
        ui.makeDonut(progWidth, '#donutSprintRemaining');

        $(sprintPeriodBarEl).empty();
//        var bar = $('<div/>').addClass('sprint-period-bar');
//        bar.append($('<span>/>').text(startText).css('float', 'left'));
//        bar.append($('<span>/>').text(sprintData.name).css('position', 'absolute').css('left', '50%').css('right', '50%').css('white-space', 'nowrap') );
//        bar.append($('<span>/>').text(endText).css('float', 'right'));
//        $(sprintPeriodBarEl).append(bar);
    }
}