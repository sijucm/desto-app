let currentScheduleIdNumber;

function addNewPoolInTeamPool(newTeamPools){
  // const poolName = 'pool5';
  // const teams = ['M10-2', 'Friends/Family'];

  // const teamDataList = teams.map(teamName => { return {team: teamName} } );
  // resetTheStandings(teamDataList);
  // newTeamPools.pools[poolName] = teamDataList;

}


const fields = { f1: '4A', f2: '4B', f3: '4C', f4: '4D', f5: 'field?' };

const timeSlots =
{
  ts1: '11:00', ts2: '11:20', ts3: '11:40',
  ts4: '09:45', ts5: '09:57', ts6: '10:09', ts7: '10:21', ts8: '10:33',
  ts9: 'time?'
};

const matchesToPlay = {
  pool1: {
    ts1: { f1: [0, 2], f2: [1, 3] },
    ts2: { f1: [1, 2], f2: [0, 3] },
    ts3: { f1: [0, 1], f2: [2, 3] },
  },
  pool2: {
    ts1: { f3: [0, 2], f4: [1, 3] },
    ts2: { f3: [1, 2], f4: [0, 3] },
    ts3: { f3: [0, 1], f4: [2, 3] },
  },
  pool3: {
    ts4: { f1: [0, 1], f2: [2, 3] },
    ts5: { f1: [0, 4], f2: [2, 1] },
    ts6: { f1: [0, 3], f2: [1, 4] },
    ts7: { f1: [0, 2], f2: [3, 4] },
    ts8: { f1: [1, 3], f2: [2, 4] },
  },
  pool4: {
    ts4: { f3: [0, 1], f4: [2, 3] },
    ts5: { f3: [0, 4], f4: [2, 1] },
    ts6: { f3: [0, 3], f4: [1, 4] },
    ts7: { f3: [0, 2], f4: [3, 4] },
    ts8: { f3: [1, 3], f4: [2, 4] },
  },
  pool5: {
    ts9: { f5: [0, 1] }
  }
}

function createMatch(poolName, timeSlotId, fieldId, teamList, teamIndexList) {
  const poolId = getPoolIdFromPoolName(poolName);

  const match = {

    id: poolId + '-' + timeSlotId + "-" + fieldId,
    field: fields[fieldId],
    time: timeSlots[timeSlotId],
    teams: [
      teamList[teamIndexList[0]],
      teamList[teamIndexList[1]]
    ]
  }

  return match;

}

function createMatchForPool(poolName, teams) {
  const matchList = [];

  const matchToPlayInPool = matchesToPlay[poolName];

  for (let timeSlot of Object.keys(matchToPlayInPool)) {

    const matchesInTimeSlotConfig = matchToPlayInPool[timeSlot];

    const fieldsInTimeSlot = Object.keys(matchesInTimeSlotConfig);

    const matchesInTimeSlot = fieldsInTimeSlot.map(
      fieldId => createMatch(poolName, timeSlot, fieldId, teams,
        matchesInTimeSlotConfig[fieldId]));

    matchList.push(...matchesInTimeSlot);

  }
  return matchList;
}


function createAllMatches(teamPools) {


  const newMatchData = { "id": "schedule" + (currentScheduleIdNumber + 1) };

  const listOfPools = Object.keys(teamPools.pools);

  for (const poolName of listOfPools) {

    const matchList = createMatchForPool(poolName, teamPools.pools[poolName].map(team => team.team));
    newMatchData[poolName] = matchList;


  }


  return newMatchData;

}

function removeTeamFromPool(newTeamPools, poolName, toBeRemovedTeamName) {
  newTeamPools.pools[poolName] = newTeamPools.pools[poolName].filter(
    team => team.team != toBeRemovedTeamName);

}

function resetTheStandings(poolTeams){
  const standingDefault = {
    "mp": 0,
    "w": 0,
    "d": 0,
    "gf": 0,
    "ga": 0,
    "points": 0
  };
   poolTeams.forEach(team => team['standings'] = { ...standingDefault })
}

function processPoolForNewteamPool(poolName, newTeamPools) {

  const currentPool = newTeamPools.pools[poolName];

  const teamWithHighestRank = currentPool.find(
    team => team.rank === 1);

  const teamWithLowestRank = currentPool.reduce(
    (prev, current) => (prev.rank > current.rank) ? prev : current);

  if (!(teamWithHighestRank && teamWithLowestRank)) {
    // this should not happen. Just do not handle it for now
    console.log("NO HIGHEST AND LOWEST !!!!");
    return;
  }


  resetTheStandings(currentPool);

  // so that this does not affect the next iteration
  delete teamWithLowestRank.rank;
  delete teamWithHighestRank.rank;

  const previousPool = findPreviousPool(newTeamPools, poolName);
  // not the first then promote
  if (previousPool) {
    previousPool.push(teamWithHighestRank);
    removeTeamFromPool(newTeamPools, poolName, teamWithHighestRank.team);

  }

  const nextPool = findNextPool(newTeamPools, poolName);

  if (nextPool) {
    nextPool.unshift(teamWithLowestRank);
    removeTeamFromPool(newTeamPools, poolName, teamWithLowestRank.team);
  }
}

function createNewTeamPool(newTeamPools) {

  newTeamPools.id = "schedule" + (currentScheduleIdNumber + 1);

  const listOfPools = Object.keys(newTeamPools.pools);

  for (const poolName of listOfPools) {
    processPoolForNewteamPool(poolName, newTeamPools);
  }

  addNewPoolInTeamPool(newTeamPools);

  return newTeamPools;
}



function getPoolIdFromPoolName(poolName) {
  return parseInt(poolName.replace(/pool/, ""));
}

function findNextPool(teamPools, poolName) {
  const poolId = getPoolIdFromPoolName(poolName);
  const nextPoolName = 'pool' + (poolId + 1);
  return teamPools.pools[nextPoolName];
}

function findPreviousPool(teamPools, poolName) {
  const poolId = getPoolIdFromPoolName(poolName);
  const previousPoolName = 'pool' + (poolId - 1);
  return teamPools.pools[previousPoolName];
}

module.exports = async function (context, req, currentTeamPools) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const scheduleId = context.bindingData.id;
  const regex = /schedule/;

  const currentScheduleIdNumberString = scheduleId.replace(regex, '');
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

  const newTeamPools = createNewTeamPool(
    JSON.parse(JSON.stringify(currentTeamPools)));
  const newMatchData = createAllMatches(newTeamPools);

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
    body: responseMessage
  };
}
