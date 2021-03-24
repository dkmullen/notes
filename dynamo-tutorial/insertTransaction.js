var AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2',
    endpoint: 'http://localhost:8000'
});

var tableName = 'NodeJsBaseballStats';

var dynamodb = new AWS.DynamoDB();

// Load the data
var teams = require('./teams.json');
var players = require('./players.json');
var games = require('./games.json');

putItems(teams)
    .then(() => {
        return putItems(players);
    })
    .then(() => {
        return putItems(games);
    })
    .catch((err) => {
        console.error('Insert failed', err);
    });

    // Transactions group actions together in an all-or-nothing operation,
    // so (in our case) if updating teams fails, we won't have incomplete
    // data written to the db
function putItems(items)
{

    return new Promise((resolve, reject) => {
        var params = {
            TransactItems:[]
        };

        items.forEach(item => {
            params.TransactItems.push({
                Put: {
                    TableName:tableName,
                    Item:item
                }
            });
        });

        dynamodb.transactWriteItems(params, (err, data) => {
            if(err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });

}