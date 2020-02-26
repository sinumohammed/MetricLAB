const jwt = require('jsonwebtoken');
const config = require('../database/config/config'),
  Promise = require('bluebird'),
  bcrypt = Promise.promisifyAll(require('bcrypt-nodejs')),
  SALT_FACTOR = 10;

const User = require("../database/models").User;

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      return res.status(201).json({
        user
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async getUserById(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findOne({
        where: { id: userId }
      });
      if (user) {
        return res.status(200).json({ user });
      }
      return res.status(404).send("User with the specified ID does not exists");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  async getUsers(req, res) {
    try {
      const users = await User.findAll({});
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body
      let query = { $or: [{ email: email }, { mobile: email }] }
      const user = await User.findOne({
        where: {
          email: email
        }
      });
      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrectt'
        })
      }
      const userJson = user.toJSON()
      delete userJson.password;

      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        message: 'An error occured trying to login'
      })
    }
    finally {
      // do some clean up
    }
  }
}