Dynamo DB Notes

If a primary AND sort key is selected, the two are combined into a unique key, and therefore one of the keys can be non-unique. Ie, if I use a user_id (partition key) and a timestamp (sort key), the same user can add records to the table as long as the timestamp is different each time.

Partition keys get stored together (in the same partition) by dynamo, which is part of the reason for its retrieval speed.

Scanning a table can use up all my read/writes; much better to query.

Filtering takes place after a query is done, so it doesn't affect read/writes.

aws dynamodb create-table --table-name demo_notes --attribute-definitions AttributeName=user_id,AttributeType=S AttributeName=timestamp,AttributeType=N --key-schema AttributeName=user_id,KeyType=HASH AttributeName=timestamp,KeyType=RANGE --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 --region us-east-2

aws dynamodb describe-table --table-name demo_notes --region-us-east-2
aws dynamodb list-tables --region us-east-2

-----
- create a new item in the table (from a json file in (in this case) the same directory

aws dynamodb put-item --table-name demo_notes --item file://meitem.json --region us-east-2

- to update multiple items, even in multiple tables...
aws dynamodb batch-write-item --request-items file://items.json
