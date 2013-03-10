

wassup.SprintBarService = function () {

    var configService,
        youTrackDao;

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

        setConfigService: function (value) {
            configService = value;
        },

        getCurrentSprint: function (callback) {

            youTrackDao.getSprintInfo(function (youTrackSprintData) {
                // Date logic to find current sprint

                var currentSprintData = youTrackSprintData.sprint[0];
                var currentSprint = {
                    name: currentSprintData.name,
                    startDate: parseSprintDate(currentSprintData.start),
                    finishDate: parseSprintDate(currentSprintData.finish),
                    currentDate: moment()
                }
                var sprintLength = currentSprint.finishDate.diff(currentSprint.startDate, 'minutes');
                var sprintPosition = currentSprint.currentDate.diff(currentSprint.startDate, 'minutes');
                var daysLeft = currentSprint.finishDate.diff(currentSprint.currentDate, 'days');
                currentSprint.progress = sprintPosition >= sprintLength ? 100 : (sprintPosition / sprintLength);
                currentSprint.daysReamining = daysLeft > 0 ? daysLeft : 0;
                callback(currentSprint);
            });
        }
    }
}
