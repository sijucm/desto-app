module.exports = async function (context, matchId, poolName, matchData,
    teamPools) {

  // context.log(matchId);
  // context.log(poolName);
  // context.log(matchObj);
  // context.log(teamPools);

  const poolData = teamPools.pools[poolName];
  const matchDataForPool = matchData[poolName];

  const matchesWithResults = matchDataForPool.filter(
      match => match.results).map(match => match.results);

  // context.log("Matches with results : "+JSON.stringify(matchesWithResults));

  const standingDefault = {
    "mp": 0,
    "w": 0,
    "d": 0,
    "gf": 0,
    "ga": 0,
    "points": 0
  };

  poolData.forEach(team => {
    team["standings"] = {...standingDefault};
    team.rank = 0
  });

  matchesWithResults.forEach(match => {

    context.log('processing match ' + JSON.stringify(match));

    const teamList = Object.keys(match).map(teamName => {
      return {'team': teamName, 'goals': match[teamName]}
    });

    console.log(" Team result in the match: " + JSON.stringify(teamList));

    const team0 = poolData.filter(
        team => team.team === teamList[0].team)[0];

    console.log(" pooldata initial of team0 : " + JSON.stringify(team0));

    const team1 = poolData.filter(
        team => team.team === teamList[1].team)[0];

    console.log("pooldata initial of team1 " + JSON.stringify(team1));

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

    poolTeam1Standings.points = poolTeam1Standings.w * 2 + poolTeam1Standings.d
        * 1;
    poolTeam0Standings.points = poolTeam0Standings.w * 2 + poolTeam0Standings.d
        * 1;

  });

  let rank = 1;
  poolData.sort(
      (a, b) => {
        const v = b.standings.points - a.standings.points
            || (a.standings.gf
                - a.standings.ga) - (b.standings.gf - b.standings.ga)
            || b.standings.gf - a.standings.gf;
        return v;
      }
  ).forEach(
      team => {
        team['rank'] = rank++;
      }
  );

  //rank1.points === rank2.points then

  context.bindings.teamPoolsUpdate = teamPools;

}