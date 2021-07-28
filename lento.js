const lento = require('lento')
const csvWriter = require('csv-write-stream')
const stdout = require('stdout-stream')
const pipeline = require('readable-stream').pipeline

const lentoTest = async(req, res) => {
    try{
        const client = lento({
          hostname: 'example',
          port: 8080,
          catalog: 'tpch',
          schema: 'tiny',
          user: 'test'
        })
        
        // const source = client.createRowStream('SELECT * FROM tpch.tiny.region;')
        client.query('select * from tpch.tiny.region', (err, rows) => {
            if(err){
                console.log("19:", err);
                res.send(err);
            }
            console.log("17",rows);
            res.send(rows)
          })
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
}

module.exports = { lentoTest }
