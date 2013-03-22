wassup.YouTrackDao = function () {

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

    this.getSprintInfo = function () {

        var url = restUrl + "agile/CMS/sprints";
        var opts = {
            auth: true,
            user: user,
            password: password
        };

        return wassup.fetchJsonSync(url, {}, opts)
    };

    this.getSprintBar = function (sprint) {
        var url = restUrl + "issue/byproject/CMS?filter=Sprint%3A+%7BSprint+" + sprint + "%7D&max=999&after=0";
        var opts = {
            auth: true,
            user: user,
            password: password
        };

        return wassup.fetchJsonSync(url, {}, opts)

    }


}