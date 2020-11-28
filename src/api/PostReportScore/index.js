const processPoints = require('./processPoints.js');

module.exports = async function (context, req, matchData, teamPools) {
  context.log('JavaScript HTTP trigger function processed a request.');

  if (req.body) {

    // var week = context.bindingData.week;
    var matchId = context.bindingData.matchId;

    const poolName = 'pool' + matchId.substring(0, 1);
    const data = matchData;

    var matchObj = data [poolName].filter(obj => {
      return obj.id === matchId
    })

    if (matchObj && matchObj.length > 0) {

      matchObj[0]['results'] = req.body;

      context.bindings.matchDataUpdated = data;

      context.res = {
        body: data
      };

      context.log(
          await processPoints(context, matchId, poolName, data, teamPools));

    } else {
      context.res = {
        status: 500,
        body: "Cannot idenitfy the match"
      };
    }
  } else {
    context.res = {
      status: 400,
      body: "Please pass a name in the request body"
    };
  }

  // context.done;
}
