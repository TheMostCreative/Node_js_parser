const fs = require('fs');
var osmosis = require('osmosis');
var savedData = [];

osmosis
    .get('https://www.apple.com')
    .find('@href')
    .set('link')
    .log(console.log)
    .data(function (data) {
        if (/^#/.test(data.link)) {
            data.link = " https://www.apple.com/" + data.link; // etc.
        }
        else if (/^\//.test(data.link)){
            data.link = " https://www.apple.com" + data.link; // etc.;
        }
        console.log(data);
        savedData.push(data);

    })
    .done(function () {
        fs.writeFile('data.json', JSON.stringify(savedData, null, 4), function (err) {
            if (err) console.error(err)
            else console.log('Data Saved to data.json file');
        })
    });
