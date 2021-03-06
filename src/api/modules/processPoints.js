const updatePointsForAPool = (poolName, matchData,
    teamPools) => {

  const poolData = teamPools.pools[poolName];
  const matchDataForPool = matchData[poolName];

  const matchesWithResults = matchDataForPool.filter(
      match => match.results).map(match => match.results);

  const standingDefault = {
    'mp': 0,
    'w': 0,
    'd': 0,
    'gf': 0,
    'ga': 0,
    'points': 0
  };

  // resetting the current standings and points
  poolData.forEach(team => {
    team['standings'] = {...standingDefault};
    team.rank = 0;
  });

  //processing each match with results
  matchesWithResults.forEach(match => {

    console.log('processing match ' + JSON.stringify(match));

    const teamList = Object.keys(match).map(teamName => {
      return {'team': teamName, 'goals': match[teamName]};
    });

    console.log(' Team result in the match: ' + JSON.stringify(teamList));

    const team0 = poolData.filter(
        team => team.team === teamList[0].team)[0];

    const team1 = poolData.filter(
        team => team.team === teamList[1].team)[0];

    // if team0 or team1 are not matching the pool. Should not happen
    // TODO But this check should happen while accessing the array above
    if (!(team0 && team1)) {
      console.log(
          'Teams cannot be identified during processing of points. team0:'
          + team0 + ' team1:' + team1);
      return;

    }

    // if the goals are empty then this can be ignored as a result. Could happen
    if (!(teamList[0]['goals'] != null && teamList[1]['goals'] != null)) {
      console.log(
          'goals are not present for the teams while processing points. team0: '
          + teamList[0]['goals'] + 'team1: ' + teamList[1]['goals']);
      return;
    }

    const poolTeam0Standings = team0.standings;
    const poolTeam1Standings = team1.standings;

    poolTeam0Standings.mp += 1;
    poolTeam1Standings.mp += 1;
    poolTeam0Standings.gf += teamList[0]['goals'];
    poolTeam0Standings.ga += teamList[1]['goals'];
    poolTeam1Standings.gf += teamList[1]['goals'];
    poolTeam1Standings.ga += teamList[0]['goals'];

    if (teamList[0]['goals'] > teamList[1]['goals']) {
      //0 team wins
      poolTeam0Standings.w += 1;

    } else if (teamList[1]['goals'] > teamList[0]['goals']) {
      //1 team wins
      poolTeam1Standings.w += 1;

    } else {
      // they drew
      poolTeam0Standings.d += 1;
      poolTeam1Standings.d += 1;
    }

    poolTeam0Standings.points = poolTeam0Standings.w * 3 + poolTeam0Standings.d;
    poolTeam1Standings.points = poolTeam1Standings.w * 3 + poolTeam1Standings.d;

  });

  let rank = 1;
  poolData.sort(
      (a, b) => {
        const v = 
            b.standings.points - a.standings.points
            || (b.standings.gf - b.standings.ga) - (a.standings.gf
                - a.standings.ga)
             || matchesAgainst(a.team, b.team, matchesWithResults)
            || b.standings.gf - a.standings.gf;
        return v;
      }
  ).forEach(
      team => {
        team['rank'] = rank++;
      }
  );

  //rank1.points === rank2.points then

  return teamPools;
  // context.bindings.teamPoolsUpdate = teamPools;

};

function matchesAgainst(teama, teamb, matchesWithResults) {
  /*
     "results": {
                "J09-2": 0,
                "J09-1": 4
            }
   */
  const matchBetweenList = matchesWithResults.filter(
      // eslint-disable-next-line no-prototype-builtins
      matchResult => matchResult.hasOwnProperty(teama)
          // eslint-disable-next-line no-prototype-builtins
          && matchResult.hasOwnProperty(teamb));

  if(matchBetweenList.length != 1) {
    return 0;
  }
  const matchBetween = matchBetweenList[0];

  if(matchBetween[teama] === matchBetween[teamb]){
    return 0;
  }else if (matchBetween[teama] > matchBetween[teamb]){
    return -1;
  }else{
    return 1;
  }

}

module.exports = updatePointsForAPool;
