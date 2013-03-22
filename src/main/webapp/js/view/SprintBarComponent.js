if (!ui) {
    var ui = {};
}

ui.sprintBar = function () {
    var sprintBarEl = $('[data-component=sprint-bar]');

    this.update = function (data) {
        $(sprintBarEl).html('');
        $.each(data, function(key, value) {
            $(sprintBarEl).append('<div class="' +
                                  toClassName(key) +
                                  '" style="width: ' +
                                  value.percent +
                                  '%;"><br/>' +
                                  (value.percent >= 15? value.count+' issues': value.count) +
                                  '</div>');
        });
    }

    function toClassName(str) {
        return str.toLowerCase().replace(" ", '-');

    }
}