const format_data = (data) => {
    
    let newResponse = {};
    let keys = data.columns.map(key => key.name);

    newResponse["columns"] = keys;

    let new_data = [];

    let original_response = data.response;
    original_response.forEach(response => {
        let tempObj = new Object();
        for (let index = 0; index < response.length; index++) {
            tempObj[keys[index]] = response[index];
        }
        new_data.push(tempObj);
    })

    newResponse["data"] = new_data;

    return newResponse;
}

module.exports = format_data;