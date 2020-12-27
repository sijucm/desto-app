module.exports = async function (context, req, teamPools, matchData) {

    context.log('JavaScript HTTP trigger function processed a request.');

    context.log(JSON.stringify(teamPools));

    context.bindings.teamPoolsBlob = teamPools;
    context.bindings.matchDataBlob= matchData;


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "DONE COPYING"
    };
}
