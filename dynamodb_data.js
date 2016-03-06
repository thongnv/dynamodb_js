var data = [];

for (var i=0; i<10; i++) {
	data.push(
		{  
			PutRequest: {
				Item: {
					"glyph_id": i,
					"glyph_created_ymd": 20160118,
					"status_id": Math.floor((Math.random() * 10) + 1),	// [1-10]
					"unicodes": [
						"0000",
						"0001",
						"0002"
					], 
					"style_id": 1,
					"glyph_name": "cid00001",
					"character_set": null,
					"glyph": {},
					"disabled": false,
					"oem": null,
					"note": null,
					"insert_user_id": 1,
					"insert_date": 20160118,
					"update_user_id": 1,
					"update_date": null

				}
			}
		}
	)
}

var params = {
    RequestItems: {
        "t_glyph": data
    }
};

//-----------------------------------------------------------------------------------//
for (var i=1; i<1000; i++) {
	// Insert single item
	var params = {
		TableName: "t_glyph",
		Item: {
				"glyph_id": i,
				"glyph_created_ymd": 20160000 + i,
				"status_id": Math.floor((Math.random() * 10) + 1),	// [1-10]
				"unicodes": [
					"0000",
					"0001",
					"0002"
				], 
				"style_id": 1,
				"glyph_name": "cid" + ("0000" + i).slice(-5),
				"character_set": null,
				"glyph": {},
				"disabled": false,
				"oem": null,
				"note": null,
				"insert_user_id": 1,
				"insert_date": 20160000 + i,
				"update_user_id": 1,
				"update_date": 20160000 + i

			},

    	"ConditionExpression": "attribute_not_exists(glyph_id) and attribute_not_exists(glyph_created_ymd)"

	};

	setTimeout(docClient.put(params, function(err, data) {
		if (err)
			console.log(JSON.stringify(err, null, 2));
		else
			console.log(JSON.stringify(data, null, 2));
	}), 10);
}