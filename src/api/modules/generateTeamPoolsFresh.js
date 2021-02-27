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
    pool1: ["J09-1", "J08-1", "J09-2", "J09-3"],
    pool2: ["J09-5", "J09-4", "J08-2", "J09-8"],
    pool3: ["J09-6", "J08-3", "J09-7", "M11-2"],
    pool4: ["M11-3","M11-2-B","J08-4","M09-3"],
    pool5: ["J08-5","J08-6","M09-2","Future-stars"],
    //pool4: ["J08-4", "M09-1", "M09-3", "J08-5"],
   // pool5: ["J08-6", "M09-2", "M11-2", "All-stars"],
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
