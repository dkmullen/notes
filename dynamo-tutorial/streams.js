// This file enables us to tap into streams and observe what has
// changed in our DB and how.. The .json files attached to this
// project show output from running this file with node streams.js
var AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2'
});

var streamArn = 'arn:aws:dynamodb:us-east-2:794314049287:table/BaseballStats/stream/2021-03-24T16:13:03.488';

var dynamodbstreams = new AWS.DynamoDBStreams({ apiVersion: '2012-08-10' });
var params = {
    StreamArn: streamArn
};

// Describe the stream
dynamodbstreams.describeStream(params, (err, data) => {
    if(err) {
        console.error('An error occurred', err);
    }else {
        console.log(JSON.stringify(data));
        var shard = data.StreamDescription.Shards[0];
        getShardIterator(shard.ShardId, shard.SequenceNumberRange.StartingSequenceNumber)
            .then(shardIterator => {
                return getRecords(shardIterator);
            })
            .catch(err => {
                console.error('An error occurred', err);
            });
    }
});

function getRecords(shardIterator) {
    var params = {
        ShardIterator:shardIterator
    };

    return new Promise((resolve, reject) => {
        dynamodbstreams.getRecords(params, (err, data) => {
            if(err) {
                reject(err);
            }
            else {
                console.log('Records\n=======================')
                console.log(JSON.stringify(data));
                resolve(data);
            }
        });
    });
}

function getShardIterator(shardId, sequenceNumber)
{
    var params = {
        SequenceNumber:sequenceNumber,
        ShardId:shardId,
        ShardIteratorType:'AT_SEQUENCE_NUMBER',
        StreamArn:streamArn
    };

    return new Promise((resolve, reject) => {
        dynamodbstreams.getShardIterator(params, (err, data) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(data.ShardIterator);
            }
        })
    });
}
