var start = new Date().getTime();

// Scan table with filter
var params = {
    TableName: 't_glyph',
    //Limit: 100, // optional (limit the number of items to evaluate)
    ScanFilter: { // optional (map of attribute name to Condition)

        glyph_id: {
            ComparisonOperator: 'LT',
            AttributeValueList: [ { N: '5000' }, ]
        },
    
        // more conditions ...
    },
    Select: 'SPECIFIC_ATTRIBUTES', // optional (ALL_ATTRIBUTES | ALL_PROJECTED_ATTRIBUTES | 
                              //           SPECIFIC_ATTRIBUTES | COUNT)
    AttributesToGet: [ // optional (list of specific attribute names to return)
        'glyph_id',
        //'glyph_created_ymd'
        // ... more attributes ...
    ],

};
dynamodb.scan(params, function(err, data) {
    if (err) console.log(err); // an error occurred
    else console.log(data); // successful response
});

var end = new Date().getTime();
var time = end - start;
console.log('Execution time: ' + time);