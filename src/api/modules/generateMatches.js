
const fields = {f1: '4A', f2: '4B', f3: '4C', f4: '4D'};

const timeSlots =
    {
      ts1: '11:00', ts2: '11:20', ts3: '11:40',
      ts4: '09:45', ts5: '09:57', ts6: '10:09', ts7: '10:21', ts8: '10:33',
    };

const matchesToPlay = {
  pool1: {
    ts1: {f1: [0, 2], f2: [1, 3]},
    ts2: {f1: [1, 2], f2: [0, 3]},
    ts3: {f1: [0, 1], f2: [2, 3]},
  },
  pool2: {
    ts1: {f3: [0, 2], f4: [1, 3]},
    ts2: {f3: [1, 2], f4: [0, 3]},
    ts3: {f3: [0, 1], f4: [2, 3]},
  },
  pool3: {
    ts4: {f1: [0, 1], f2: [2, 3]},
    ts5: {f1: [0, 4], f2: [2, 1]},
    ts6: {f1: [0, 3], f2: [1, 4]},
    ts7: {f1: [0, 2], f2: [3, 4]},
    ts8: {f1: [1, 3], f2: [2, 4]},
  },
  pool4: {
    ts4: {f3: [0, 1], f4: [2, 3]},
    ts5: {f3: [0, 4], f4: [2, 1]},
    ts6: {f3: [0, 3], f4: [1, 4]},
    ts7: {f3: [0, 2], f4: [3, 4]},
    ts8: {f3: [1, 3], f4: [2, 4]},
  },
}

function createMatch(poolName, timeSlotId, fieldId, teamList, teamIndexList) {
  const poolId = getPoolIdFromPoolName(poolName);

  return {

    id: poolId + '-' + timeSlotId + "-" + fieldId,
    field: fields[fieldId],
    time: timeSlots[timeSlotId],
    teams: [
      teamList[teamIndexList[0]].team,
      teamList[teamIndexList[1]].team
    ]
  };

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

function createAllMatches(teamPools, scheduleName) {
  const newMatchData = {"id": scheduleName};

  const listOfPools = Object.keys(teamPools.pools);

  for (const poolName of listOfPools) {

    const matchList = createMatchForPool(poolName, teamPools.pools[poolName]);
    newMatchData[poolName] = matchList;

  }

  return newMatchData;

}


function getPoolIdFromPoolName(poolName) {
  return parseInt(poolName.replace(/pool/, ""));
}

module.exports = createAllMatches;
