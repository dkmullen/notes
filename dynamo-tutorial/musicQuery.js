var AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2',
    endpoint: 'http://localhost:8000'
});

var tableName = 'Music';

var dynamodb = new AWS.DynamoDB();

getList('The Acme Band')
    .then(games => {
        console.log(JSON.stringify(games));
    })
    .catch(ex => {
        console.error('An error occurred', ex);
    });

function getList(artist) {
    return new Promise((resolve, reject) => {
        var params = {
            ExpressionAttributeValues: {
             ":a": {
               S: artist
              }
            }, 
            KeyConditionExpression: "Artist = :a", 
            ProjectionExpression: "SongTitle", 
            TableName: "Music"
           };

        dynamodb.query(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
