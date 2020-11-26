module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = "{week: 1, pools: { pool1: [ { team: 'J09-1', wins: 2, draws: 1, points: 5 } ] ]}";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}