const numberOfPools = 6;
let currentScheduleIdNumber;

const timeSlotFieldList = {
  pool1: {
    timeSlot: "t1",
    fields: ["f1", "f2"],
  },
  pool2: {
    timeSlot: "t1",
    fields: ["f3", "f4"],
  },
  pool3: {
    timeSlot: "t2",
    fields: ["f3", "f4"],
  },
  pool4: {
    timeSlot: "t2",
    fields: ["f3", "f4"],
  },
  pool5: {
    timeSlot: "t3",
    fields: ["f3", "f4"],
  },
  pool6: {
    timeSlot: "t3",
    fields: ["f3", "f4"],
  },
};

const fields = {f1: '4A', f2: '4B', f3: '4C', f4: '4D'};

const timeSlots =
    {
      t1s1: '12:15', t1s2: '12:35', t1s3: '12:55',
      t2s1: '11:00', t2s2: '11:20', t2s3: '11:20',
      t3s1: '09:45', t3s2: '10:05', t3s3: '10:25'
    };

const matchesToPlay = {
  s1: {
    f1: [0, 2],
    f2: [1, 3]
  },
  s2: {
    f1: [1, 2],
    f2: [0, 3]
  },
  s3: {
    f1: [0, 1],
    f2: [2, 3]
  },
};

function createMatchForPool(poolNumber, teams) {
  const matchList = [];
  for (let matchNumber = 1; matchNumber <= 3; matchNumber++) {
    const timeslotKey = timeSlotFieldList['pool' + poolNumber].timeSlot
        + 's'
        + matchNumber;
    const match1 = {
      id: poolNumber + '-' + matchNumber + 'f1',
      field: fields.f1,
      time: timeSlots[timeslotKey],
      teams: [teams[matchesToPlay['s' + matchNumber].f1[0]].team,
        teams[matchesToPlay['s' + matchNumber].f1[1]].team]
    }
    const match2 = {
      id: poolNumber + '-' + matchNumber + 'f2',
      field: fields.f2,
      time: timeSlots[timeslotKey],
      teams: [teams[matchesToPlay['s' + matchNumber].f2[0]].team,
        teams[matchesToPlay['s' + matchNumber].f2[1]].team]
    }

    matchList.push(match1);
    matchList.push(match2);

  }
  return matchList;
}

function createAllMatches(teamPools) {
  const newMatchData = {"id": "schedule" + (currentScheduleIdNumber + 1)};

  for (let i = 1; i <= numberOfPools; i++) {
    const poolName = 'pool' + i;
    const poolId = i;

    const matchList = createMatchForPool(poolId, teamPools.pools[poolName]);
    newMatchData[poolName] = matchList;

  }

  return newMatchData;

}

function removeTeamFromPool(newTeamPools, poolName, toBeRemovedTeamName) {
  newTeamPools.pools[poolName] = newTeamPools.pools[poolName].filter(
      team => team.team != toBeRemovedTeamName);

}

function createNewTeamPool(teampools) {
  const newTeamPools = teampools;

  newTeamPools.id = "schedule" + (currentScheduleIdNumber + 1);

  const standingDefault = {
    "mp": 0,
    "w": 0,
    "d": 0,
    "gf": 0,
    "ga": 0,
    "points": 0
  };

  // IMPORTANT: please note that this starts with 1 and not 0
  for (let i = 1; i <= numberOfPools; i++) {
    const poolName = 'pool' + i;
    const currentPool = newTeamPools.pools[poolName];

    const teamWithHighestRank = currentPool.find(
        team => team.rank === 1);
    const teamWithLowestRank = currentPool.find(
        team => team.rank === 4);

    if (!(teamWithHighestRank && teamWithLowestRank)) {
      // this should not happen. Just do not handle it for now
      continue;
    }

    //cleaning up the standings before the moving
    currentPool.forEach(team => team['standings'] = {...standingDefault})

    // so that this does not affect the next iteration
    delete teamWithLowestRank.rank;
    delete teamWithHighestRank.rank;

    // not the first then promote
    if (i > 1) {
      newTeamPools.pools['pool' + (i - 1)].push(teamWithHighestRank);
      removeTeamFromPool(newTeamPools, poolName, teamWithHighestRank.team);

    }

    if (i < numberOfPools) {
      newTeamPools.pools['pool' + (i + 1)].unshift(teamWithLowestRank);
      removeTeamFromPool(newTeamPools, poolName, teamWithLowestRank.team);
    }

  }
  return newTeamPools;
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

  const newTeamPools = createNewTeamPool(currentTeamPools);
  const newMatchData = createAllMatches(newTeamPools);

  context.bindings.newMatchData = newMatchData;
  context.bindings.newTeamPools = newTeamPools;
  const currentTeamPoolsUpdated = currentTeamPools;
  currentTeamPoolsUpdated['locked'] = true;
  context.bindings.currentTeamPoolsUpdated = currentTeamPoolsUpdated;

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage
  };
}
//
// function createMatch() {
//
//   const fieldList = ["F1", "F2"];
//   const newMatchData = {"id": "" + (currentScheduleId + 1)};
//   // IMPORTANT: please note that this starts with 1 and not 0
//   for (let i = 1; i <= numberOfPools; i++) {
//     const poolName = 'pool' + i;
//     const currentPoolMatchList = newMatchData[poolName] = [];
//
//     const currentPoolTeamList = newTeamPools[poolName].map(team => team.team);
//
//     if (!currentPoolMatchList.length === 4) {
//       return;
//     }
//
//     currentPoolMatchList.push({
//       "id": "",
//       "field": fieldList[0],
//       "time": "",
//       teams: [currentPoolTeamList[0], currentPoolTeamList[3]]
//     })
//
//     // currentPoolMatchList.push()
//
//   }
// }

// match team[0] with team [3] F1
// match team[1] with team[2]  F2
// match team[0] with team[2] F1
// match team[1] with team [3] F2
// match team[0] with team[1] F2
// match team[2] with team[3] F1
