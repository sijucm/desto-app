module.exports = async function (context, req, teampools) {
  context.log('JavaScript HTTP trigger function processed a request.');

  console.log(teampools);
  const connectionString = process.env.ToTest;

  context.log('ToTest value is : '+connectionString);

  context.res = {
    // status: 200, /* Defaults to 200 */
    body:teampools
  };
}
