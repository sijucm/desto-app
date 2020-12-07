module.exports = async function (context, req, matchData) {
  context.log('JavaScript HTTP trigger function processed a request.');


  const getMatches = (poolName) => {
    const d = {};
    const p = matchData[poolName];
    const matchResultList = p.filter(
        match => Object.prototype.hasOwnProperty.call(match, "results")).map(
        match => match.results);
    d[poolName] = matchResultList;

    return d;

  }

  const retData = Object.keys(matchData).filter(key => key.startsWith("pool")).map(
      key => getMatches(key));

  const formattedText = "";

  retData.

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: retData
  };
}
