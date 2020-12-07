const processPoints = require('../modules/processPoints.js');

module.exports = async function (context, req, matchData, teamPools) {
  context.log('JavaScript HTTP trigger function processed a request. ');

  if (req.body) {

    context.log('request body is ' + req.body);

    if (!teamPools || !matchData) {
      // without existing data not happy
      return;
    }

    const header = req.headers["x-ms-client-principal"];
    console.log(JSON.stringify(header));
    // const encoded = Buffer.from(header, "base64");
    // const decoded = encoded.toString("ascii");

    // console.log(JSON.stringify(decoded));

    if (teamPools['locked']) {
      console.log("cannot change. Team pool is locked "
          + context.bindingData.scheduleId);
      // cannot change any more
      context.res = {
        body: matchData
      };
      return;
    }

    // var week = context.bindingData.week;
    var matchId = context.bindingData.matchId;

    const poolName = 'pool' + matchId.substring(0, 1);
    const _matchDataUpdated = matchData;
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

    var matchObj = _matchDataUpdated [poolName].filter(obj => {
      return obj.id === matchId
    })

    if (matchObj && matchObj.length > 0) {

      // check if the teams match the match id
      //TODO add the below validation after testing
      // req.body.keys().includes(matchObj.teams);

      matchObj[0]['results'] = req.body;

      context.bindings.matchDataUpdated = _matchDataUpdated;

      context.res = {
        body: _matchDataUpdated
      };

      // triggering point calculation. This could be made asycn event later
      await processPoints(poolName, _matchDataUpdated, teamPools);
      // updating the team pools here. This could be moved to another function.\
      // But just kept here for cheap performance/cost
      context.bindings.teamPoolsUpdate = teamPools;

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
