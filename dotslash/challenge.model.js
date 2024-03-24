const mongoose = require("mongoose");
const ChallengeSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  question_name: { type: String, required: true },
  question: { type: String, required: true },
  difficulty_level: {
    type: Number,
    required: true,
  },
  function: {
    type: String, required:true
  },

  test_cases: [{
    input: { type: Array, required: true },
    expected_output: { type: [typeof {}], required: true }
  }]
});
module.exports = mongoose.model('Challenge', ChallengeSchema);