const axios = require('axios');
const cheerio = require('cheerio');
const db = require("./models");
const locationControler = require('./controllers/location.controller.js');
db.sequelize.sync();
require('./models/bootstrap.js')();     // comment this when you dont want to create  location records 

const urls = ['https://www.srilanka.travel', 'http://www.tourismmin.gov.lk/web/index.php/en/'];  // add  more urls here

const execute = async () => {
    try {
        let keywords = await locationControler.getKeywords();
        let locations = await locationControler.getAllLocations();
        let result = await (locationControler.findKeywordsInSite(urls, locations, keywords));
        console.log(result);
    } catch (error) {
        console.log(result);
    }
}
console.log("Running....")
execute();
