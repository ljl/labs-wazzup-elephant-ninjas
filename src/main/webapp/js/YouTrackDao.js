if (!wassup) {
    var wassup = {};
}

wassup.YouTrackDao = function () {

    var thisDao = this;
    var youTrackUrl;
    var restUrl;
    var user;
    var password;

    this.setYouTrackUrl = function (value) {
        youTrackUrl = value;
        restUrl = youTrackUrl + "rest/";
    }

    this.setYouTrackCredentials = function (credentials) {
        user = credentials.user;
        password = credentials.password;
    }

    this.getSprintInfo = function (callback) {

        console.log("getSprintInfo creds: ", user, password);
        var url = restUrl + "agile/CMS/sprints";
        $.ajax({
            url: url,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', make_base_auth(user, password));
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