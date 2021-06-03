## DynamoDB

Every item in DynamoDB requires at least one attribute, the partition key. When you provide your item and partition key, DynamoDB hashes your key and uses that hash value as the memory address for your data. 

Bad partition keys are ones that will be accessed too much or too little. A date, for example, can be accessed by all sorts of resources. On the other hand, once it is passed, it might never be needed again. 

Good keys are spread across all nodes and are regularly accessed, UserID is a good one.

// Gets all records
`
aws dynamodb scan --return-consumed-capacity "TOTAL" --table-name BaseballStats
`

// More expensive, more data consistency than is probably needed (protects against a read containing stale data, useful for when reads are very fast and frequent)
`
aws dynamodb scan --return-consumed-capacity "TOTAL" --consistent-read --table-name BaseballStats
`

// Returns the Seattle Mariners (filters are the most expensive way to search, so keep them small. Scanning means to look through all records, not very efficient)
`
aws dynamodb scan --return-consumed-capacity "TOTAL" --table-name BaseballStats --filter-expression 'TeamID = :t' --expression-attribute-values '{":t":{"S":"TEAMINFO_SEA"}}'
`

// In contrast to the above, this query (not a scan) looks at only six records
`
aws dynamodb query --table-name BaseballStats --key-condition-expression "TeamID = :t" --expression-attribute-values '{":t":{"S":"GAMES_LAA"}}' --return-consumed-capacity "TOTAL"
`

// This one scans and returns 3 records for team LAA and their games between two dates
`
aws dynamodb query --table-name BaseballStats \
--key-condition-expression "TeamID = :t AND SK BETWEEN :d1 AND :d2" \
--expression-attribute-values '{":t":{"S":"GAMES_LAA"},":d1":{"S":"20190401"},":d2":{"S":"20190417"}}' \
--return-consumed-capacity "TOTAL"
`

// Same as above but filters out games with less than 6 runs (scans 3 records, returns one; you pay for the scans tho)
`
aws dynamodb query --table-name BaseballStats \
--key-condition-expression "TeamID = :t AND SK BETWEEN :d1 AND :d2" \
--expression-attribute-values '{":t":{"S":"GAMES_LAA"},":d1":{"S":"20190401"},":d2":{"S":"20190417"}, ":r":{"N":"5"}}' \
--return-consumed-capacity "TOTAL" \
--filter-expression "Runs >= :r"
`

Run locally from home dir: `./runDynamo.sh` (we set up that shellscript earlier)


`
aws dynamodb create-table \
--table-name LocalBaseballStats \
--attribute-definitions AttributeName=TeamID,AttributeType=S AttributeName=SK,AttributeType=S \
--key-schema AttributeName=TeamID,KeyType=HASH AttributeName=SK,KeyType=RANGE \
--provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
--endpoint-url http://localhost:8000
`

Use this command and the related file to create an online AWS dynamoDB table from the

`aws dynamodb create-table --cli-input-json file://create-movie-table.json --region us-east-2`


