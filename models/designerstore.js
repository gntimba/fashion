'use strict';
module.exports = (sequelize, DataTypes) => {
  const designerStore = sequelize.define('designerStore', {
    category: DataTypes.STRING,
    brandName: DataTypes.STRING,
    location: DataTypes.STRING,
    address: DataTypes.STRING,
    user_id: DataTypes.UUID,
    active: { type: DataTypes.BOOLEAN, defaultValue: 1}
  }, {});
  designerStore.associate = function(models) {
    // associations can be defined here
  };
  return designerStore;
};