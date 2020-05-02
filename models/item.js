'use strict';
module.exports = (sequelize, DataTypes) => {
  const item = sequelize.define('item', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false
    },
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    itemName: DataTypes.STRING,
    store_id: DataTypes.INTEGER,
    active: { type: DataTypes.BOOLEAN, defaultValue: 1 }
  }, {});
  item.associate = function (models) {
    // associations can be defined here
  };
  return item;
};