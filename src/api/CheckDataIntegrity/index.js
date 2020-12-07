module.exports = async function (context, req, teamPools, matchData) {
  context.log('JavaScript HTTP trigger function processed a request.');


  const getTeamsInPool = (poolname) => teamPools.pools[poolname].map(
      team => team.team);

  Object.keys(matchData).filter(key => key.startsWith("pool"))
  .forEach(key => matchData[key].forEach(
      match => {
        if ( ! getTeamsInPool(key).includes(match.teams[0]) || !getTeamsInPool(key).includes(match.teams[1])   ) {
          console.log(
              "#####Does not match")
        }
      }));




  const name = (req.query.name || (req.body && req.body.name));
  const responseMessage = name
      ? "Hello, " + name
      + ". This HTTP triggered function executed successfully."
      : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage
  };
}
