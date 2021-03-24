// Creade a table using node.js
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2',
    endpoint: 'http://localhost:8000'
});

const dynamodb = new AWS.DynamoDB();
const params = 
{
    TableName: 'NodeJsBaseballStats',
    KeySchema: [
        { AttributeName: 'TeamID', KeyType: 'HASH' }, // Partition Key
        { AttributeName: 'SK', KeyType: 'RANGE' } // Sort Key
    ],
    AttributeDefinitions: [
        { AttributeName:'TeamID', AttributeType: 'S' },
        { AttributeName:'SK', AttributeType: 'S' }
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