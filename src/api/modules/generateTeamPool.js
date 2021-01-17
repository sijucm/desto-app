

function removeTeamFromPool(newTeamPools, poolName, toBeRemovedTeamName) {
  newTeamPools.pools[poolName] = newTeamPools.pools[poolName].filter(
      team => team.team != toBeRemovedTeamName);

}

function createNewTeamPool(sourceTeamPools, scheduleName) {

  const newTeamPools = JSON.parse(JSON.stringify(sourceTeamPools));

  newTeamPools.id = scheduleName;

  const standingDefault = {
    "mp": 0,
    "w": 0,
    "d": 0,
    "gf": 0,
    "ga": 0,
    "points": 0
  };

  const listOfPools = Object.keys(newTeamPools.pools);

  for (const poolName of listOfPools) {
    const currentPool = newTeamPools.pools[poolName];

    const teamWithHighestRank = currentPool.find(
        team => team.rank === 1);

    const teamWithLowestRank = currentPool.reduce(
        (prev, current) => (prev.rank > current.rank) ? prev : current);

    if (!(teamWithHighestRank && teamWithLowestRank)) {
      // this should not happen. Just do not handle it for now
      continue;
    }

    //cleaning up the standings before the moving
    currentPool.forEach(team => team['standings'] = {...standingDefault})

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

module.exports = createNewTeamPool;
