// List all Tables
var params = {};

dynamodb.listTables(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

// Create table
var params = {
    TableName : "t_glyph",
    KeySchema: [       
        { AttributeName: "glyph_id", KeyType: "HASH" },  //Partition key
        { AttributeName: "glyph_created_ymd", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [
		{ AttributeName: "glyph_id", AttributeType: "N" },
        { AttributeName: "glyph_created_ymd", AttributeType: "N" },	
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

// Delete the table
var params = {
    TableName: "t_glyph"
};

dynamodb.deleteTable(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

// Show table information
var params = {
    TableName: "t_glyph"
};

dynamodb.describeTable(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

// Show all table data
var params = {
    TableName: "t_glyph"
};

docClient.scan(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

// Insert single item
var params = {
    TableName: "t_glyph",
    Item: {
        "glyph_id":"1",
        "glyph_created_ymd":"20160118",
        "status_id":"10",
        "unicodes": [
			"0000",
			"0001",
			"0002"
        ]
    }
};

docClient.put(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

// Insert multiple items
var params = {
    RequestItems: {
        "t_glyph": [ 
            {  
                PutRequest: {
                    Item: {
						"glyph_id":1,
						"glyph_created_ymd":20160118,
                    }
                }
            }, 
            { 
                PutRequest: {
                    Item: {
						"glyph_id":2,
						"glyph_created_ymd":20160118,
                    }
                }
            }, 
        ]
    }
};

docClient.batchWrite(params, function (err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});


// Query data by primary key
var params = {
    TableName: "t_glyph",
    KeyConditionExpression: "glyph_id = :glyph_id",
    ExpressionAttributeValues: {
        ":glyph_id": 1
    }
};

docClient.query(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

// Query data by Key Attributes
var params = {
    TableName: "t_glyph",
    ProjectionExpression: "unicodes",
    KeyConditionExpression: "unicodes = :unicodes",
    ExpressionAttributeValues: {
        ":unicodes": "0000",
    }
};

// Scan table with filter
var params = {
    TableName: 't_glyph',
    //Limit: 100, // optional (limit the number of items to evaluate)
    ScanFilter: { // optional (map of attribute name to Condition)

        glyph_created_ymd: {
            ComparisonOperator: 'LT',
            AttributeValueList: [ { N: '100000' }, ]
        }
    
        update_date: {
            ComparisonOperator: 'GT', // (EQ | NE | IN | LE | LT | GE | GT | BETWEEN | 
                                      //  NOT_NULL | NULL | CONTAINS | NOT_CONTAINS | BEGINS_WITH)
            AttributeValueList: [ { N: '10000' }, ],
        },
        // more conditions ...
    },
    Select: 'SPECIFIC_ATTRIBUTES', // optional (ALL_ATTRIBUTES | ALL_PROJECTED_ATTRIBUTES | 
                              //           SPECIFIC_ATTRIBUTES | COUNT)
    AttributesToGet: [ // optional (list of specific attribute names to return)
        'glyph_id',
        'glyph_created_ymd'
        // ... more attributes ...
    ],
    Segment: 0, // optional (for parallel scan)
    TotalSegments: 0, // optional (for parallel scan)
    ExclusiveStartKey: { // optional (for pagination, returned by prior calls as LastEvaluatedKey)
        attribute_name: { S: 'STRING_VALUE' },
        // anotherKey: ...
    },
    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
};
dynamodb.scan(params, function(err, data) {
    if (err) console.log(err); // an error occurred
    else console.log(data); // successful response
});