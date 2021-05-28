const a = require('../modules/cosmosclient');
module.exports = async function (context) {
  context.log('JavaScript HTTP trigger function processed a request.');

  await a.deleteAllCases(context, context.bindingData.scheduleId);

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: 'done deleting ' + context.bindingData.scheduleId
  };
};
