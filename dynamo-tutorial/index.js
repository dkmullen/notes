// Creade a table using node.js
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2',
    endpoint: 'http://localhost:8000'
});

const dynamodb = new AWS.DynamoDB();
const params = 
{
    TableName: 'Music',
    KeySchema: [
        { AttributeName: 'Artist', KeyType: 'HASH' }, // Partition Key
        { AttributeName: 'SongTitle', KeyType: 'RANGE' } // Sort Key
    ],
    AttributeDefinitions: [
        { AttributeName:'Artist', AttributeType: 'S' },
        { AttributeName:'SongTitle', AttributeType: 'S' }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

dynamodb.createTable(params, (err, data) => {
    if(err) {
        console.log('Unable to create table', JSON.stringify(err));
    } else {
        console.log('Table created');
    }
})