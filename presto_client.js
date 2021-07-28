const { error } = require('console')
const express = require('express')
const bodyParser = require('body-parser')
var presto = require('@dalongrong/trino-client')
const factor = require("./tools/format_data")

const  getQueryResult = async (req, res) => {
    try{
        const client = new presto.Client({
            user: 'trino:trino',
            host : '172.21.0.2',
            Hostname: "e723f04e6885",
            port: 8080,
    })

console.log(client);
const page = req.params.pageNumber;
const records_per_page = 10;
const offset = ( page - 1 ) * records_per_page;
// let query = req.body.query.slice(0,-1);
// query =`${query} OFFSET ${offset} LIMIT ${records_per_page}`;

     await client.execute({
    //  query : 'SELECT t.name , COUNT(*) OVER () AS actual_page_size, MAX(row) OVER () = total_rows AS last_page, total_rows, row,  ((row - 1) / :max_page_size) + 1 AS current_page FROM (SELECT u.*, COUNT(*) OVER () AS total_rows, ROW_NUMBER () OVER (ORDER BY u.custkey) AS row FROM ( SELECT * FROM customer) AS u ORDER BY u.custkey OFFSET :offset ROWS FETCH NEXT :max_page_size ROWS ONLY) AS t ORDER BY t.custkey' ,  
    // query : `SELECT * from customer OFFSET ${offset} LIMIT ${records_per_page}` ,
    query : `WITH Data_CTE AS ( SELECT * FROM customer WHERE custkey IS NOT NULL), Count_CTE AS (SELECT COUNT(*) AS TotalRows From Data_CTE) SELECT * FROM Data_CTE CROSS JOIN Count_CTE OFFSET ${offset} LIMIT ${records_per_page}`, 
    catalog: 'tpch',
    schema:  'sf1',
    source:  'nodejs-client',
    state:   function(error, query_id, stats){ 
                        if(error){
                            console.log("24", error);
                        }
                        console.log({message:"status changed", id:query_id, stats:stats}); 
                    },
                    columns: function(error, data){ console.log({resultColumns: data}); },
                    data:    function(error, data, columns, stats){ 
                        const newArray = columns.map(element => element.name)
                        console.log(newArray);

                        if(error){
                            return res.send(error)
                        }
                        return res.send(data) 
                        console.log(data)
                        
                    },
                    success: function(error, stats){},
                    error:   function(error){
                        console.log("40", error);
                        return res.send(error)
                    }
});
    }
    catch(error){
        console.log("38***************************", error);
        return res.send(error);
    }
}

module.exports = { getQueryResult };