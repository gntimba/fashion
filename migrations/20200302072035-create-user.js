'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
        allowNull: false
      },
      lastName: Sequelize.CHAR(50),
      firstName: Sequelize.CHAR(50),
      picture:Sequelize.CHAR(50),
      dob:Sequelize.DATE,
      mail: Sequelize.STRING,
      phoneNumber:Sequelize.CHAR(50),
      address:{ type: Sequelize.STRING, defaultValue: null},
      city:{ type: Sequelize.STRING, defaultValue: null},
      postal:{ type: Sequelize.STRING, defaultValue: null},
      suburb:{ type: Sequelize.STRING, defaultValue: null},
      active: { type: Sequelize.BOOLEAN, defaultValue: 1},
      created_date: { type: Sequelize.DATE, defaultValue: Date.now },
      updated_date: { type: Sequelize.DATE, defaultValue: Date.now },
      active_hash: Sequelize.STRING,
      role_id: { type: Sequelize.INTEGER, defaultValue: 0 }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};