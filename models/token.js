'use strict';
module.exports = (sequelize, DataTypes) => {
    const token = sequelize.define('token', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            allowNull: false
        }, token: DataTypes.TEXT,
        user_ID: DataTypes.UUID,
        active: { type: DataTypes.BOOLEAN, defaultValue: true},
    }, {});
    token.associate = function (models) {
        // associations can be defined here
    };
    return token;
};