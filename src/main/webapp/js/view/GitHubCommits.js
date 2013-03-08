if (!ui) {
    var ui = {};
}

ui.gitHubCommits = function () {
    var el = $('[data-component=github-commits]');

    this.update = function (data) {
        $(el).html('<ul></ul>');
        data.forEach(function (element, index, array) {
            $(el).find('ul').append('<li>' +
                                    '<img src="' +
                                    element.author.avatar_url +
                                    '" />' +
                                    element.commit.committer.name +
                                    '</li>');
        });
    }
}