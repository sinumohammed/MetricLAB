'use strict';
module.exports = (sequelize, DataTypes) => {
  const Suggestion = sequelize.define('Suggestion', {
    prodId: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Suggestion.associate = function (models) {
    // associations can be defined here
    Suggestion.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    })
  };
  return Suggestion;
};