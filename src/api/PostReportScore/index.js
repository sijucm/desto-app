module.exports = async function (context, req,  matchData) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.body) {

        // var week = context.bindingData.week;
        var matchId = context.bindingData.matchId;

        const poolName = 'pool'+matchId.substring(0,1);
        const data = matchData;
        var result = data [poolName].filter(obj => {
            return obj.id === matchId
        })

        if(result && result.length > 0) {

            result[0]['results'] = req.body;

            context.bindings.matchDataUpdated = data;

            context.res = {
                body: data
            };

        }else{
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
