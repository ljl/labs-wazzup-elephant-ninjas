if (!wassup) {
    var wassup = {};
}

wassup.YouTrackDao = function () {

    var thisDao = this;
    var youTrackUrl;
    var restUrl;
    var youTrackUser;
    var youTrackPassword;

    this.setYouTrackUrl = function (value) {
        youTrackUrl = value;
        restUrl = youTrackUrl + "rest/";
    }

    this.getSprintInfo = function (callback) {
        var url = restUrl + "agile/CMS/sprints";
        $.ajax({
            url: url,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', make_base_auth('user', '***'));
            },
            dataType: 'json',
            success: callback,
            error: function () {
                console.log(arguments);
            }
        });
    };

    function make_base_auth(user, password) {
        var tok = user + ':' + password;
        var hash = btoa(tok);
        return "Basic " + hash;
    }
}