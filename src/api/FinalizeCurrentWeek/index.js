const  createAllMatches = require('../modules/generateMatches')
const  createNewTeamPool = require('../modules/generateTeamPool')

module.exports = async function (context, req, currentTeamPools) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const scheduleId = context.bindingData.id;
  const regex = /schedule/;

  const currentScheduleIdNumberString = scheduleId.replace(regex, '');
  let currentScheduleIdNumber = -1;
  if (isNaN(currentScheduleIdNumberString)) {
    // that is not expected
    console.error(
        "Schedule Id does not end in a number to identify the schedule: "
        + scheduleId);
    return;
  } else {
    currentScheduleIdNumber = parseInt(currentScheduleIdNumberString);
  }

  const name = (req.query.name || (req.body && req.body.name));
  const responseMessage = name
      ? "Hello, " + name
      + ". This HTTP triggered function executed successfully."
      : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";


  const nextScheduleName = "schedule"+(currentScheduleIdNumber + 1);

  const newTeamPools = createNewTeamPool(
      JSON.parse(JSON.stringify(currentTeamPools)), nextScheduleName);
  const newMatchData = createAllMatches(newTeamPools, nextScheduleName);

  context.bindings.newMatchData = newMatchData;
  newTeamPools['locked'] = false;
  newTeamPools['lockLevel'] = "teamAdmin";
  context.bindings.newTeamPools = newTeamPools;
  const currentTeamPoolsUpdated = currentTeamPools;
  currentTeamPoolsUpdated['locked'] = true;
  currentTeamPoolsUpdated['lockLevel'] = "teamAdmin";
  context.bindings.currentTeamPoolsUpdated = currentTeamPoolsUpdated;

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage
  };
}
