module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const connectionString = process.env.ToTest;

  context.log('ToTest value is : '+connectionString);

  const responseMessage = {
    week: 1,
    pools: {
      pool1: [
        {
          team: 'J09-1 - Data from API',
          wins: 2,
          draws: 1,
          points: 5
        }
      ],
      pool5: [
        {
          team: 'J09-5 - Data from API',
          wins: 2,
          draws: 1,
          points: 5
        }
      ],
    }
  };

  context.res = {
    // status: 200, /* Defaults to 200 */
    body:context.bindings.teampools
  };
}
