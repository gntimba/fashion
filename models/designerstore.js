'use strict';
module.exports = (sequelize, DataTypes) => {
  const designerStore = sequelize.define('designerStore', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false
    },
    category: DataTypes.STRING,
    brandName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    latitude:DataTypes.DOUBLE,
    longitude:DataTypes.DOUBLE,
    address: DataTypes.STRING,
    user_id: DataTypes.UUID,
    logo: DataTypes.STRING,
    active: { type: DataTypes.BOOLEAN, defaultValue: 1 }
  }, {});
  designerStore.associate = function (models) {
    // associations can be defined here
  };
  return designerStore;
};