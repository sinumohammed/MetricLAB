const Suggestion = require("../database/models").Suggestion;
const User = require("../database/models").User;

module.exports = {
  async create(req, res) {
    try {
      const suggestion = await Suggestion.create(req.body);
      return res.status(201).json({
        suggestion
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error.message });
    }
  },
  async getUserWithSuggestions(req, res) {
    try {
      const { userId } = req.params;
      const users = await User.findOne({
        attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
        where: { id: userId },
        include: [{
          model: Suggestion,
          as: 'suggestions',
        }],
      });
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },

}