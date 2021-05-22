const axios = require('axios');
const cheerio = require('cheerio');
const db = require("./models");
const locationControler = require('./controllers/location.controller.js');
db.sequelize.sync();
require('./models/bootstrap.js')();     // comment this when you dont want to create  location records 

const urls = ['https://www.srilanka.travel', 'http://www.tourismmin.gov.lk/web/index.php/en/'];  // add  more urls here

const execute = async (links) => {
    try {
        const keywords = await locationControler.getKeywords();
        const locations = await locationControler.getAllLocations();
        const result = await (locationControler.findKeywordsInSite(links, locations, keywords));
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
execute(urls);
