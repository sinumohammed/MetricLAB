const Suggestion = require("../database/models").Suggestion;

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
  }
}