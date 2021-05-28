const {CosmosClient} = require('@azure/cosmos');

function getCosmosClient() {
  const connString = process.env['CosmosDBConnection'];

  // context.log("Connection st is 1: "+ connString);

  const client = new CosmosClient(connString);

  return client;

}

async function deleteAllCases(context, scheduleId) {

  const client = getCosmosClient(context);

  await deleteFromContainer(client, 'desto', 'MatchEventLog', scheduleId);

}

async function deleteFromContainer(client, databaseId, containerId,
    scheduleId) {
  const database = client.database(databaseId);
  const container = database.container(containerId);

  console.log('debug module : ' + container);

  // query to return all items
  const querySpec = {
    query: 'SELECT * from c where c.scheduleId ="' + scheduleId+'"',
  };

  // console.log(JSON.stringify(querySpec));
  // read all items in the Items container
  const {resources: items} = await container.items
  .query(querySpec)
  .fetchAll();

  // console.log(JSON.stringify(items));
  items.forEach((item) => {
    console.log(`${item.id} - ${item.description}`);
    container.item(item.id, item.scheduleId).delete();
  });
}

module.exports = {deleteAllCases};
