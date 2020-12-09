function getMatchesForTeam(matchData, teamName) {
  return Object.keys(matchData)
  .filter(key => key.startsWith('pool'))
  .flatMap(poolName => matchData[poolName])
  .filter(match => match.teams.includes(teamName))
      .filter(match => match.results);
}

module.exports = async function (context, req, matchDataList) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const teamName = context.bindingData.teamName;

  const teamMatches = matchDataList.map(
      matchData => {
        return {
          scheduleId: matchData.id,
          matches: getMatchesForTeam(matchData, teamName)
        }
      });

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: teamMatches
  };
}
