function resetTheStandings(currentPool) {
  const standingDefault = {
    "mp": 0,
    "w": 0,
    "d": 0,
    "gf": 0,
    "ga": 0,
    "points": 0
  };
  currentPool.forEach(team => team['standings'] = {...standingDefault})
}

function createNewTeamPoolFresh(scheduleName) {

  const newTeamPools = {
    id: scheduleName,
    pools: {}
  };

  const poolsData = {
    "pool1": ["J09-2", "J08-1", "J09-1", "J09-5"],
    "pool2": ["J09-3", "J08-2", "J09-4", "J09-6"],
    "pool3": ["J09-8", "J09-7", "J08-3", "M11-2 A"],
    "pool4": ["M09-1", "M11-3", "J08-4", "M09-3"],
    "pool5": ["M11-2 B", "J08-5", "M09-2", "J08-6"]
  }

  Object.keys(poolsData).forEach(poolName => {
    newTeamPools.pools[poolName] = poolsData[poolName].map(teamName => {
      return {team: teamName}
    });
    resetTheStandings(newTeamPools.pools[poolName]);
  })

  return newTeamPools;
}

module.exports = createNewTeamPoolFresh;
