module.exports = async function (context, req, teamPools) {
  context.log('JavaScript HTTP trigger function processed a request.');

  // const data = "1,J09-1,J10-3,4A,12:15#1,J10-2,J09-3,4B,12:15#2,J10-2,J10-3,4A,12:35#2,J09-1,J09-2,4B,12:35#3,J09-1,J10-2,4A,12:55#3,J09-3,J10-3,4B,12:55";

  // const fullData =  {pool2: "1,J09-2,J10-7,4C,12:15#1,J08-1,J10-5,4D,12:15#2,J10-5,J09-2,4C,12:35#2,J10-7,J08-1,4D,12:35#3,J08-1,J09-2,4C,12:55#3,J10-5,J10-7,4D,12:55",
  //  pool3 : "1,J09-4,J08-3,4A,11:00#1,J10-4,J08-2,4B,11:00#2,J09-4,J10-4,4A,11:20#2,J08-2,J08-3,4B,11:20#3,J08-3,J10-4,4A,11:40#3,J09-4,J08-2,4B,11:40",
  //  pool4 : "1,M09-1,J09-6,4C,11:00#1,J10-6,J09-5,4D,11:00#2,M09-1,J09-5,4C,11:20#2,J10-6,J09-6,4D,11:20#3,J09-5,J09-6,4C,11:40#3,M09-1,J10-6,4D,11:40",
  //  pool5 : "1,J09-8,J08-6,4A,09:45#1,J09-7,J08-5,4B,09:45#2,J08-6,J09-7,4A,10:05#2,J08-5,J09-8,4B,10:05#3,J09-8,J09-7,4A,10:25#3,J08-5,J08-6,4B,10:25",
  //  pool6 : "1,J08-4,M09-3,4C,09:45#1,M09-2,M11-3,4D,09:45#2,M11-3,J08-4,4C,10:05#2,M09-3,M09-2,4D,10:05#3,M09-3,M11-3,4C,10:25#3,J08-4,M09-3,4D,10:25"}

//   const fullData = {pool1:"1,J09-1,J10-3,4A,12:15#2,J10-2,J09-3,4B,12:15#3,J10-2,J10-3,4A,12:35#1,J09-1,J09-3,4B,12:35#2,J09-1,J10-2,4A,12:55#3,J09-3,J10-3,4B,12:55",
// pool2:"1,J09-2,J10-7,4C,12:15#2,J08-1,J10-5,4D,12:15#3,J10-5,J09-2,4C,12:35#1,J10-7,J08-1,4D,12:35#2,J08-1,J09-2,4C,12:55#3,J10-5,J10-7,4D,12:55",
// pool3: "1,J09-4,J08-3,4A,11:00#2,J10-4,J08-2,4B,11:00#3,J09-4,J10-4,4A,11:20#1,J08-2,J08-3,4B,11:20#2,J08-3,J10-4,4A,11:40#3,J09-4,J08-2,4B,11:40",
// pool4: "1,M09-1,J09-6,4C,11:00#2,J10-6,J09-5,4D,11:00#3,M09-1,J09-5,4C,11:20#1,J10-6,J09-6,4D,11:20#2,J09-5,J09-6,4C,11:40#3,M09-1,J10-6,4D,11:40",
// pool5: "1,J09-8,J08-6,4A,09:45#2,J09-7,J08-5,4B,09:45#3,J08-6,J09-7,4A,10:05#1,J08-5,J09-8,4B,10:05#2,J09-8,J09-7,4A,10:25#3,J08-5,J08-6,4B,10:25",
// pool6: "1,J08-4,M09-3,4C,09:45#2,M09-2,M11-3,4D,09:45#3,M11-3,J08-4,4C,10:05#1,M09-3,M09-2,4D,10:05#2,M09-3,M11-3,4C,10:25#3,J08-4,M09-2,4D,10:25"}

  /*  const fullData = {pool1: "1,J09-1,J10-3,4A,12:15#  1,J09-2,J10-2,4B,12:15#  2,J10-2,J10-3,4A,12:35#  2,J09-2,J09-1,4B,12:35#  3,J09-1,J10-2,4A,12:55#  3,J09-2,J10-3,4B,12:55",
   pool2: "1,J08-1,J08-2,4C,12:15#  1,J09-3,J10-7,4D,12:15#  2,J10-7,J08-1,4C,12:35#  2,J08-2,J09-3,4D,12:35#  3,J09-3,J08-1,4C,12:55#  3,J08-2,J10-7,4D,12:55",
   pool3: "1,J09-4,J10-6,4A,11:00#  1,J10-4,J10-5,4B,11:00#  2,J09-4,J10-4,4A,11:20#  2,J10-5,J10-6,4B,11:20#  3,J10-5,J10-4,4A,11:40#  3,J09-4,J10-5,4B,11:40",
   pool4: "1,J09-5,J09-8,4C,11:00#  1,J08-3,M09-1,4D,11:00#  2,J09-5,M09-1,4C,11:20#  2,J08-3,J09-8,4D,11:20#  3,M09-1,J09-8,4C,11:40#  3,J08-3,J09-5,4D,11:40",
   pool5: "1,J09-6,J08-4,4A,09:45#  1,J08-5,J09-7,4B,09:45#  2,J08-4,J09-7,4A,10:05#  2,J09-6,J08-5,4B,10:05#  3,J08-4,J08-5,4A,10:25#  3,J09-6,J09-7,4B,10:25",
   pool6: "1,M11-3,M09-2,4C,09:45#  1,M09-3,J08-6,4D,09:45#  2,M09-2,M09-3,4C,10:05#  2,J08-6,M11-3,4D,10:05#  3,M09-2,J08-6,4C,10:25#  3,M11-3,M09-3,4D,10:25"}

   */

  const fullData = {
    pool1: "1,J09-2,J08-1,4A,11:00#2,J09-1,J09-4,4B,11:00#3,J09-1,J08-1,4A,11:20#4,J09-2,J09-4,4B,11:20#5,J08-1,J09-4,4A,11:40#6,J09-1,J09-2,4B,11:40",
    pool2: "1,J09-3,J09-5,4C,11:00#2,J08-2,J09-8,4D,11:00#3,J08-2,J09-5,4C,11:20#4,J09-3,J09-8,4D,11:20#5,J08-2,J09-3,4C,11:40#6,J09-5,J09-8,4D,11:40",
    pool3: "1,M09-1,J09-7,4A,9:45#2,M11-3,J09-6,4B,9:45#3,M11-3,J09-7,4A,9:57#4,J09-6,J08-3,4B,9:57#5,M09-1,J08-3,4A,10:09#6,J08-3,M11-3,4B,10:09#7,J09-6,J09-7,4A,10:21#8,M09-1,M11-3,4B,10:21#9,J08-3,J09-7,4A,10:33#0,M09-1,J09-6,4B,10:33",
    pool4: "1,J08-5,J08-6,4C,9:45#2,M09-3,M09-2,4D,9:45#3,M09-3,J08-6,4C,9:57#4,M09-2,J08-4,4D,9:57#5,J08-5,J08-4,4C,10:09#6,J08-4,M09-3,4D,10:09#7,M09-2,J08-6,4C,10:21#8,J08-5,M09-3,4D,10:21#9,J08-4,J08-6,4C,10:33#0,J08-5,M09-2,4D,10:33"
  }

  // const fullData = {
  //   pool1: "1,J09-1,J10-3,4A,12:15#1,J09-2,J10-2,4B,12:15#2,J10-2,J10-3,4A,12:35#2,J09-2,J09-1,4B,12:35#3,J09-1,J10-2,4A,12:55#3,J09-2,J10-3,4B,12:55",
  //   pool2: "1,J08-1,J08-2,4C,12:15#1,J09-3,J10-7,4D,12:15#2,J10-7,J08-1,4C,12:35#2,J08-2,J09-3,4D,12:35#3,J09-3,J08-1,4C,12:55#3,J08-2,J10-7,4D,12:55",
  //   pool3: "1,J09-4,J10-6,4A,11:00#1,J10-4,J10-5,4B,11:00#2,J09-4,J10-4,4A,11:20#2,J10-5,J10-6,4B,11:20#3,J10-6,J10-4,4A,11:40#3,J09-4,J10-5,4B,11:40",
  //   pool4: "1,J09-5,J09-8,4C,11:00#1,J08-3,M09-1,4D,11:00#2,J09-5,M09-1,4C,11:20#2,J08-3,J09-8,4D,11:20#3,M09-1,J09-8,4C,11:40#3,J08-3,J09-5,4D,11:40",
  //   pool5: "1,J09-6,J08-4,4A,09:45#1,J08-5,J09-7,4B,09:45#2,J08-4,J09-7,4A,10:05#2,J09-6,J08-5,4B,10:05#3,J08-4,J08-5,4A,10:25#3,J09-6,J09-7,4B,10:25",
  //   pool6: "1,M11-3,M09-2,4C,09:45#1,M09-3,J08-6,4D,09:45#2,M09-2,M09-3,4C,10:05#2,J08-6,M11-3,4D,10:05#3,M09-2,J08-6,4C,10:25#3,M11-3,M09-3,4D,10:25"
  // };

  const fullOut = {};

  for (let i = 1; i <= 4; i++) {

    const data = fullData['pool' + i];
    const resultList = data.split('#');

    // var resultObj = {team1:"", team2:"", team1Goal:-1, team2Goal:-1};

    const matchList = resultList.map(r => {
      let [mid, team1, team2, field, time] = r.split(",");
      return {mid, team1, team2, field, time};
    });

    const fields = {f1: '4A', f2: '4B', f3: '4C', f4: '4D'};
    const mapFields = (fieldName) => Object.keys(fields).filter(
        key => fields[key] === fieldName);

    const poolId = i;
    const poolMatches = matchList.map(match => {
      return {
        id: poolId + "-" + match.mid + mapFields(match.field),
        field: match.field,
        time: match.time,
        teams: [match.team1, match.team2]
      }
    });
    fullOut['pool' + i] = poolMatches;

  }

  // const getTeamsInPool = (poolName) => teamPools.pools[poolName].map(
  //     team => team.team);

  // const validateData = (poolName, data) => {
  //   const teamNameList = getTeamsInPool(poolName);
  //   data.forEach(match => {
  //     if (!(teamNameList.includes(match.teams[0]) && teamNameList.includes(
  //         match.teams[1]))) {
  //       console.log("!!!!!!!!!!!!!!!!!!!!! Not correct");
  //     }
  //   });
  // };

  // Object.keys(fullOut).filter(key => key.startsWith("pool")).forEach(
  //     key => validateData(key, fullOut[key])
  // )

  const teamData = {
    pool1: [
      "J09-1",
      "J09-2",
      "J08-1",
      "J09-4"],
    pool2: [
      "J09-3",
      "J08-2",
      "J09-8",
      "J09-5"
    ],
    pool3: [
      "J08-3",
      "M09-1",
      "J09-7",
      "J09-6",
      "M11-3"
    ],
    pool4: [
      "J08-4",
      "J08-5",
      "J08-6",
      "M09-2",
      "M09-3"
    ]
  }

  const pool3 = scheduleForPool(teamData.pool3, 3, ["4A", "4B"]);
  const pool4 = scheduleForPool(teamData.pool4, 4, ["4C", "4D"]);

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: {pool3, pool4}
  };
}

function scheduleForPool(poolData, poolId, fields) {
  const timeSlotTeam = {
    "09:45": [[1,2], [3,4]],
    "09:57": [[1,5], [3,2]],
    "10:09": [[1,4], [2,5]],
    "10:21": [[1,3], [4,5]],
    "10:33": [[2,4], [3,5]]
  }

  const createMatch = (timeSlot) => {
    const matchData = {
      "id": "1-1f1",
      "field": "4A",
      "time": "11:00",
      "teams": [
        "J09-2",
        "J08-1"
      ]
    };

    const firstMatch = timeSlotTeam[timeSlot][0];
    const match1 = JSON.parse(JSON.stringify(matchData));
    match1.id = poolId+"-"+timeSlot+"-"+fields[0];
    match1.field = fields[0];
    match1.time = timeSlot;
    match1.teams = [ poolData[firstMatch[0]-1], poolData[firstMatch[1]-1]];

    const secondMatch= timeSlotTeam[timeSlot][1];
    const match2 = JSON.parse(JSON.stringify(matchData));
    match2.id = poolId+"-"+timeSlot+"-"+fields[1];
    match2.field = fields[1];
    match2.time = timeSlot;
    match2.teams = [ poolData[secondMatch[0]-1], poolData[secondMatch[1]-1]];

    return [match1, match2];

  }

  return Object.keys(timeSlotTeam).flatMap(createMatch);


}

function generateTeamData(teamData) {

  const outData = {"pools": {}}
  for (let i = 1; i <= 4; i++) {
    const data = teamData['pool' + i];

    outData.pools['pool' + i] = data.map(getTeamJD);

  }

  return outData;

}

function getTeamJD(teamName) {
  const templateD = {
    "team": "",
    "standings": {
      "mp": 0,
      "w": 0,
      "d": 0,
      "gf": 0,
      "ga": 0,
      "points": 0
    },
    "rank": 1
  }

  templateD.team = teamName;
  return templateD;
}



