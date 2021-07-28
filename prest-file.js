const fs = require('fs');
const util = require('util');
const pipeline = util.promisify(require('stream').pipeline);
const { Client } = require('presto-stream-client');

    //Presto query
const prestoFile = async (req, res) => {
    const client = new Client({
        user: 'presto',
        host: "localhost",
        port: "8080",
        catalog: 'tpch',
        schema:  'sf1'
    }); 
    
(async ()=>{
    const statement = await client.execute({query:'show schemas from tpch;',
          success: function(error, stats){  console.log(" error on success : " + error); },
          error:   function(error){ console.log(" error on failure : " + error); }
    });

    // const writeStream = fs.createWriteStream('/test.txt');

    statement.on('state_change',(currentState,stats)=>{
        console.log(`state changed to ${currentState} for query ${statement.query_id}`);
        console.log(stats);
    });
    await pipeline(statement, () => console.log(statement));

})();

// var content = fs.readFileSync('/test.txt','utf8');
// console.log(content)

}

module.exports = { prestoFile }