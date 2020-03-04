'use strict';
module.exports = (sequelize, DataTypes) => {
  const store_review = sequelize.define('store_review', {
    review: DataTypes.STRING,
    store_id: DataTypes.INTEGER,
    active: { type: DataTypes.BOOLEAN, defaultValue: 1}
  }, {});
  store_review.associate = function(models) {
    // associations can be defined here
  };
  return store_review;
};