module.exports = (sequelize, Sequelize) => {
    const Locations = sequelize.define("Locations", {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull:false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        parent_id: {
            type: Sequelize.INTEGER
        }
    });

    return Locations;
};