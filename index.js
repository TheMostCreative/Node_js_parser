const fs = require('fs');
var osmosis = require('osmosis'); //пак для парсинга
var savedData = [];

osmosis  
    .get('https://www.apple.com') //берем ссылку
    .find('@href') //выборка по элементам
    .set('link') // пишем тип
    .log(console.log) //вывод в консоль (особенности osmosis)
    .data(function (data) {  //записываем данные которые взяли, регулярками делаем из относительного адреса абсолютные
        if (/^#/.test(data.link)) {  
            data.link = " https://www.apple.com/" + data.link; // etc.
        }
        else if (/^\//.test(data.link)){
            data.link = " https://www.apple.com" + data.link; // etc.;
        }
        console.log(data);
        savedData.push(data); //добавляем в массив наши данные

    })
    .done(function () { //записываем в data.json наш массив savedData преобразовывая его в JSON
        fs.writeFile('data.json', JSON.stringify(savedData, null, 4), function (err) {
            if (err) console.error(err)
            else console.log('Data Saved to data.json file');
        })
    });
