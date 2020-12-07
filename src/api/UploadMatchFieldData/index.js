module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');


  // const data = "1,J09-1,J10-3,4A,12:15#1,J10-2,J09-3,4B,12:15#2,J10-2,J10-3,4A,12:35#2,J09-1,J09-2,4B,12:35#3,J09-1,J10-2,4A,12:55#3,J09-3,J10-3,4B,12:55";

  // const fullData =  {pool2: "1,J09-2,J10-7,4C,12:15#1,J08-1,J10-5,4D,12:15#2,J10-5,J09-2,4C,12:35#2,J10-7,J08-1,4D,12:35#3,J08-1,J09-2,4C,12:55#3,J10-5,J10-7,4D,12:55",
  //  pool3 : "1,J09-4,J08-3,4A,11:00#1,J10-4,J08-2,4B,11:00#2,J09-4,J10-4,4A,11:20#2,J08-2,J08-3,4B,11:20#3,J08-3,J10-4,4A,11:40#3,J09-4,J08-2,4B,11:40",
  //  pool4 : "1,M09-1,J09-6,4C,11:00#1,J10-6,J09-5,4D,11:00#2,M09-1,J09-5,4C,11:20#2,J10-6,J09-6,4D,11:20#3,J09-5,J09-6,4C,11:40#3,M09-1,J10-6,4D,11:40",
  //  pool5 : "1,J09-8,J08-6,4A,09:45#1,J09-7,J08-5,4B,09:45#2,J08-6,J09-7,4A,10:05#2,J08-5,J09-8,4B,10:05#3,J09-8,J09-7,4A,10:25#3,J08-5,J08-6,4B,10:25",
  //  pool6 : "1,J08-4,M09-3,4C,09:45#1,M09-2,M11-3,4D,09:45#2,M11-3,J08-4,4C,10:05#2,M09-3,M09-2,4D,10:05#3,M09-3,M11-3,4C,10:25#3,J08-4,M09-3,4D,10:25"}

  const fullData = {pool1:"1,J09-1,J10-3,4A,12:15#2,J10-2,J09-3,4B,12:15#3,J10-2,J10-3,4A,12:35#1,J09-1,J09-3,4B,12:35#2,J09-1,J10-2,4A,12:55#3,J09-3,J10-3,4B,12:55",
pool2:"1,J09-2,J10-7,4C,12:15#2,J08-1,J10-5,4D,12:15#3,J10-5,J09-2,4C,12:35#1,J10-7,J08-1,4D,12:35#2,J08-1,J09-2,4C,12:55#3,J10-5,J10-7,4D,12:55",
pool3: "1,J09-4,J08-3,4A,11:00#2,J10-4,J08-2,4B,11:00#3,J09-4,J10-4,4A,11:20#1,J08-2,J08-3,4B,11:20#2,J08-3,J10-4,4A,11:40#3,J09-4,J08-2,4B,11:40",
pool4: "1,M09-1,J09-6,4C,11:00#2,J10-6,J09-5,4D,11:00#3,M09-1,J09-5,4C,11:20#1,J10-6,J09-6,4D,11:20#2,J09-5,J09-6,4C,11:40#3,M09-1,J10-6,4D,11:40",
pool5: "1,J09-8,J08-6,4A,09:45#2,J09-7,J08-5,4B,09:45#3,J08-6,J09-7,4A,10:05#1,J08-5,J09-8,4B,10:05#2,J09-8,J09-7,4A,10:25#3,J08-5,J08-6,4B,10:25",
pool6: "1,J08-4,M09-3,4C,09:45#2,M09-2,M11-3,4D,09:45#3,M11-3,J08-4,4C,10:05#1,M09-3,M09-2,4D,10:05#2,M09-3,M11-3,4C,10:25#3,J08-4,M09-2,4D,10:25"}

   const fullOut = {};

   for(let i = 1; i <= 6; i++) {

     const data = fullData['pool'+i];
     const resultList = data.split('#');

     // var resultObj = {team1:"", team2:"", team1Goal:-1, team2Goal:-1};

     const matchList = resultList.map(r => {
       let [mid, team1, team2, field, time] = r.split(",");
       return {mid, team1, team2, field, time};
     });

     const fields = {f1: '4A', f2: '4B', f3: '4C', f4: '4D'};
     const mapFields = (fieldName) => Object.keys(fields).filter(
         key => fields[key] === fieldName);

     const poolId = 1;
     const poolMatches = matchList.map(match => {
       return {
         id: poolId + "-" + match.mid + mapFields(match.field),
         field: match.field,
         time: match.time,
         teams: [match.team1, match.team2]
       }
     });
     fullOut['pool'+i] = poolMatches;

   }





  context.res = {
    // status: 200, /* Defaults to 200 */
    body: fullOut
  };
}



function poolData() {
  const data = {
    pool1: ["J09-1", "J10-2", "J10-3", "J09-3"],
    pool2: ["J09-2", "J08-1", "J10-5", "J10-7"],
    pool3: ["J09-4", "J08-2", "J10-4", "J08-3"],
    pool4: ["J09-5", "J09-6", "J10-6", "M09-1"],
    pool5: ["J09-8", "J09-7", "J08-5", "J08-6"],
    pool6: ["J08-4", "M09-2", "M09-3", "M11-3"]
  }


  const standingDefault = {
    "mp": 0,
    "w": 0,
    "d": 0,
    "gf": 0,
    "ga": 0,
    "points": 0
  };

  const getPoolTeamData = poolName => data[poolName].map(teamName => {
    return {team: teamName, "standings": {...standingDefault} }
  });

  const poolList = Object.keys(data).map(key => {
    const r = {};
    r[key] = getPoolTeamData(key);
    return r;
  });

  const fullOut = {};

  poolList.forEach(p => fullOut[Object.keys(p)[0]] = p[Object.keys(p)[0]] );
}
