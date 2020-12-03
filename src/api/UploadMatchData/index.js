function addResultToMatchObject(resultObj, matchListFull) {

  resultObj.team1 = resultObj.team1.toUpperCase();
  resultObj.team2 = resultObj.team2.toUpperCase();


  const matchList = matchListFull.filter(
      match => match['teams'].includes(resultObj.team1)
          && match['teams'].includes(resultObj.team2));

  console.log(JSON.stringify(resultObj));
  console.log(JSON.stringify(matchList));

  if (matchList.length === 1) {
    const match = matchList[0];
    const resultData = {};
    resultData[resultObj.team1] = parseInt(resultObj.team1Goal);
    resultData[resultObj.team2] = parseInt(resultObj.team2Goal);
    match['results'] = resultData;

    console.log(JSON.stringify(match));

  } else {
    // something is wrong
    console.log("there is no clear match " + JSON.stringify(matchList));
    return;
  }

}

module.exports = async function (context, req, matchData) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const name = (req.query.name || (req.body && req.body.name));
  const responseMessage = name
      ? "Hello, " + name
      + ". This HTTP triggered function executed successfully."
      : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";


 // const data ="J10-4,J09-3,1,5#J10-3,J09-4,4,1#J10-3,J09-3,2,0#J10-4,J09-4,2,2#J10-3,J10-4,3,1#J09-3,J09-4,2,1";

 // const data = "J09-8,J10-6,2,3#J10-5,J08-2,3,1#J09-8,J10-5,1,5#J10-6,J08-2,3,1#J10-5,J10-6,2,0#J09-8,J08-2,0,3#J09-5,J08-5,2,0#J10-7,J08-3,4,0#J08-3,J09-5,2,1#J10-7,J08-5,4,1#J10-7,J09-5,4,0#J08-5,J08-3,0,3#J09-7,M09-1,0,2#J09-6,J08-4,2,1#J08-4,J09-7,0,1#M09-1,J09-6,0,1#J09-6,J09-7,2,1#J08-4,M09-1,0,4#J08-6,M09-3,1,0#M09-2,M09-3,4,1#M09-2,J08-6,3,3";

  // const data = "J09-1,J10-2,0,0#J09-2,J10-3,2,1#J09-1,J09-2,5,0#J10-2,J10-3,3,2#J10-2,J09-2,2,2#J10-3,J09-1,0,2#J10-4,J09-3,0,2#J10-5,J08-1,3,3#J08-1,J09-3,3,1#J10-4,J10-5,3,2#J10-5,J09-3,1,7#J10-4,J08-1,1,5#J10-6,J09-4,2,2#J09-5,J08-2,2,2#J10-6,J09-5,2,1#J08-2,J09-4,1,4#J09-4,J09-5,3,0#J10-6,J08-2,1,2#J10-7,J08-3,1,0#J09-6,J09-8,0,3#J09-8,J10-7,4,3#J08-3,J09-8,3,3#J08-3,J09-6,3,0#J09-6,J10-7,1,3#J08-6,J09-7,1,3#J08-4,J08-5,1,2#J08-5,J09-7,2,0#J08-6,J08-4,0,6#J08-5,J08-6,1,0#J09-7,J08-4,0,2";

  // add data in format like above. changes also the part that updates the data
  const data = "";

  const resultList = data.split('#');

  // var resultObj = {team1:"", team2:"", team1Goal:-1, team2Goal:-1};

  const resultObjList = resultList.map(r => {
    let [team1, team2, team1Goal, team2Goal] = r.split(",");
    return {team1, team2, team1Goal, team2Goal};
  });

  const matchListFull = Object.keys(matchData).filter(
      key => key.startsWith("pool")).flatMap(
      key => matchData[key]);

  console.log(JSON.stringify(matchListFull));

  resultObjList.forEach(
      resultObj => addResultToMatchObject(resultObj, matchListFull)
  );

//TODO IMPORTANT: Uncomment this for this function to work. Just commented to avoid unwanted changes
  // context.bindings.matchDataUpdated = matchData;

  // context.log("after data update: " + JSON.stringify(matchData));

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage
  };

}
