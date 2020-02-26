'use strict';
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING

  }, {
      hooks: {
        // beforeCreate: hashPassword,
        // beforeUpdate: hashPassword,
        beforeSave: hashPassword
      }
    });

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Suggestion, {
      foreignKey: 'userId',
      as: 'suggestions',
      onDelete: 'CASCADE',
    });
  };
  return User;
};