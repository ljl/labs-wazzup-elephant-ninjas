wassup.SprintBarService = function () {

    var youTrackDao;

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

            return sprintTimeBar;
        }
    }
}
