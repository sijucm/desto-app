const processPoints = require('../modules/processPoints')

module.exports = async function (context, req, matchData, teamPools) {
  context.log('JavaScript HTTP trigger function processed a request.');

  Object.keys(teamPools.pools).forEach(
      poolName => processPoints(poolName, matchData, teamPools))

  context.bindings.teamPoolsUpdate = teamPools;

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: teamPools
  };
}
