const Location = require('../controllers/location.controller.js')


module.exports = async ()=>{
   await Location.create({name: "Sri Lanka", parent_id: null});
   await Location.create({name: "Colombo", parent_id: 1});
   await Location.create({name: "United Kingdom", parent_id: null});
   await Location.create({name: "London", parent_id: 3});

}