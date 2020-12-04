const processPoints = require('./processPoints.js');

module.exports = async function (context, req, matchData, teamPools) {
  context.log('JavaScript HTTP trigger function processed a request. ');

  if (req.body) {

    context.log('request body is ' + req.body);

    if (!teamPools || !matchData) {
      // without existing data not happy
      return;
    }

    if (teamPools['locked']) {
      console.log("cannot change. Team pool is locked "
          + context.bindingData.scheduleId);
      // cannot change any more
      return;
    }

    // var week = context.bindingData.week;
    var matchId = context.bindingData.matchId;

    const poolName = 'pool' + matchId.substring(0, 1);
    const data = matchData;
    try {
      const matchEvent = {
        scheduleId: context.bindingData.scheduleId,
        poolName: poolName,
        matchId: matchId,
        data: req.body,
        time: new Date().toISOString()
      };
      context.bindings.matchEventLogsOut = matchEvent;

    } catch (err) {
      context.log("Error while storing match event " + err);
    }

    var matchObj = data [poolName].filter(obj => {
      return obj.id === matchId
    })

    if (matchObj && matchObj.length > 0) {

      // check if the teams match the match id
      //TODO add the below validation after testing
      // req.body.keys().includes(matchObj.teams);

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
