wassup.SprintBarService = function () {

    var youTrackDao;

    var currentSprint;

    // parses date in format 'MMM DD' (Mar 12) to a moment() object
    function parseSprintDate(dateValue) {
        var currentYear = new Date().getFullYear();
        var date = moment(currentYear.toString() + ' ' + dateValue, "YYYY MMM DD");
        if (moment().diff(date, 'months') > 1) {
            // correct year if we are in Dec and the date is 'Jan 03'
            date = moment((currentYear + 1).toString() + ' ' + dateValue, "YYYY MMM DD");
        }
        return date;
    }

    return {
        setYouTrackDao: function (value) {
            youTrackDao = value;
        },

        getSprintTimeBar: function () {

            var youTrackSprintData = youTrackDao.getSprintInfo();
            // Date logic to find current sprint

            var currentSprintData = youTrackSprintData.sprint[0];
            currentSprint = currentSprintData.name.split(" ")[1];

            var sprintTimeBar = {
                name: currentSprintData.name,
                startDate: parseSprintDate(currentSprintData.start),
                finishDate: parseSprintDate(currentSprintData.finish),
                currentDate: moment()
            }
            var sprintLength = sprintTimeBar.finishDate.diff(sprintTimeBar.startDate, 'minutes');
            var sprintPosition = sprintTimeBar.currentDate.diff(sprintTimeBar.startDate, 'minutes');
            var daysLeft = sprintTimeBar.finishDate.diff(sprintTimeBar.currentDate, 'days');
            sprintTimeBar.progress = sprintPosition >= sprintLength ? 100 : (sprintPosition / sprintLength);
            sprintTimeBar.daysReamining = daysLeft > 0 ? daysLeft : 0;

            sprintTimeBar.startDate = sprintTimeBar.startDate.format("DD MMMM");
            sprintTimeBar.finishDate = sprintTimeBar.finishDate.format("DD MMMM");

            return sprintTimeBar;
        },

        getSprintBar: function () {
            var rawData = youTrackDao.getSprintBar(currentSprint);
            var acceptedStates = {"Open": true, "In Progress": true, "Pull Request": true, "Verified": true, "Fixed": true}
            var stats = {};
            var total = 0;
            rawData.forEach(function (issue, index, arr) {
                var state = "";
                issue.field.forEach(function (field) {
                    if (field.name == "State") {
                        state = field.value[0];

                    }
                });
                if (acceptedStates[state]) {
                    total++;
                    if (stats[state]) {
                        stats[state] = stats[state] + 1;
                    } else {
                        stats[state] = 1;
                    }
                }
            });

            /*
            // generate random values for testing widths
            total = 0;
            for (var key in stats) {
                stats[key] = Math.floor(Math.random()*30) + 1;
                total = total + stats[key];
            }
            */

            for (var key in stats) {
                var amount = stats[key];
                stats[key] = amount / total * 100;
                stats[key] = {
                    percent: amount / total * 100,
                    count: amount
                };
            }


            return stats;
        }
    }
}
