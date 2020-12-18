module.exports = async function (context, req, matchSettings) {
    context.log('JavaScript HTTP trigger function processed a request.');

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: matchSettings
    };
}
