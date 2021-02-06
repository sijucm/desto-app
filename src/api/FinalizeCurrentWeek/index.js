const  createAllMatches = require('../modules/generateMatches')
const  createNewTeamPool = require('../modules/generateTeamPool')
const  createNewTeamPoolFresh = require('../modules/generateTeamPoolsFresh')

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


  const nextScheduleName = "schedule"+(currentScheduleIdNumber + 1);

  const createFresh = true;
  let newTeamPools ;
  if(! createFresh ) {
     newTeamPools = createNewTeamPool(currentTeamPools
        , nextScheduleName);
  }else {
    newTeamPools = createNewTeamPoolFresh(nextScheduleName);
  }

  const newMatchData = createAllMatches(newTeamPools, nextScheduleName);

  context.bindings.newMatchData = newMatchData;
  newTeamPools['locked'] = false;
  newTeamPools['lockLevel'] = "anonymous";
  context.bindings.newTeamPools = newTeamPools;
  const currentTeamPoolsUpdated = currentTeamPools;
  // currentTeamPoolsUpdated['locked'] = true;
  // currentTeamPoolsUpdated['lockLevel'] = "teamadmin";
  context.bindings.currentTeamPoolsUpdated = currentTeamPoolsUpdated;

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: "New schedule created: "+ nextScheduleName
  };
}
