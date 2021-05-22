const axios = require('axios');
const cheerio = require('cheerio');
const db = require("../models");
const Location = db.locations;
const fs = require('fs');
const Op = db.Sequelize.Op;


// Create and Save a new Location
exports.create = async (data) => {
    try {
        // Validate data
        if (!data.name) {
            console.log("Content can not be empty.");
            return;
        }
        // Create a Location
        const location = {
            name: data.name,
            parent_id: data.parent_id,
        };
        const result = await Location.findAll();
        result = JSON.stringify(result, null, 2);
        if (result.length < 5) {
            await Location.create(location);
        }
        return result;
    } catch (error) {
        return error;
    }
};

// Retrieve all locations from the database.
exports.getAllLocations = async () => {
    try {
        const result = await Location.findAll();
        result = JSON.stringify(result, null, 2);
        const formattedResult = [];
        for (dataVal of JSON.parse(result)) {
            formattedResult.push(dataVal.name);
        }
        return formattedResult;
    } catch (error) {
        return error;
    }
}

// Retrieve all keywords from the database.
exports.getKeywords = new Promise((resolve, reject) => {
    fs.readFile('./keywords.txt', 'utf8', function (err, data) {
        if (err) {
            reject(err);
        }
        resolve(data.toString().split("\n"));
    });
});


exports.findKeywordsInSite = async (urls, locations, keywords) => {
    try {
        let count = 0;
        for (url of urls) {
            axios.get(url)
                .then(response => {
                    const $ = cheerio.load(response.data)
                    const elements = $('body'); // split body element
                    const foundKeys = [];
                    const locationMentioned = [];
                    elements.each((i, elem) => {  // loop each element in the body tag
                        const elementText = $(elem).text();
                        for (dataVal of keywords) {
                            const n = elementText.includes(dataVal); // check keywords found in each element text
                            if (n) foundKeys.push(dataVal)

                        }
                        for (dataVal of locations) {  // check locations found in each element text
                            const n = elementText.includes(dataVal);
                            if (n) locationMentioned.push(dataVal)

                        }
                        if (foundKeys.length != 0 || locationMentioned.length != 0) count++;

                        let printString = "=====================================\n";
                        printString += "URL :" + url + "\n";
                        printString += "Keywords found:" + foundKeys.toString() + "\n";
                        printString += "Locations mentioned:" + locationMentioned.toString() + "\n";
                        printString += "\n";
                        fs.appendFileSync('./result.txt', printString + "\n", function (err) {
                            if (err) throw err;
                        });
                        if (count === 5) return "Successfully executed";
                    });
                })
                .catch(error => {
                    return error;
                })
        }
        return "Successfully executed";

    } catch (error) {
        return error;
    }
}